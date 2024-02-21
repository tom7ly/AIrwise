import axios from "axios";
import EventEmitter from "events";
import { initMock } from "./mock";
import { FastifyInstance } from "fastify";
import Fastify from "fastify";
import mercuriusWithGateway from "@mercuriusjs/gateway";
import { printSchema } from "graphql";

enum ServiceStatus {
    UP = 'UP',
    DOWN = 'DOWN'
}

export interface IService {
    name: string;
    url: string;
    urlBase: string;
    mandatory?: boolean;
    status?: ServiceStatus;
}

export interface IGatewayConfig {
    graphiql: boolean;
    gateway: {
        services: IService[];
        pollingInterval: number;
    };
}

const servicePool: IService[] = [
    {
        "name": "airport",
        "url": "http://localhost:3000/graphql",
        "urlBase": "http://localhost:3000/",
    }
];

export class ServiceManager {
    private services: IService[] = [];
    private gateway: FastifyInstance;

    constructor() {
        this.services = servicePool;
        this.gateway = Fastify();
        this.gateway.get('/current-schema', async (req, reply) => {
            const schema = this.gateway.graphql.schema;
            return printSchema(schema);
        });
        this.gateway.get('/services', async (req, reply) => {
            for (const service of this.services) {
                await this.healthCheck(service);
            }
            return this.services;
        })
    }
    
    healthCheck = async (service: IService): Promise<void> => {
        try {
            const response = await axios.get(service.urlBase);
            service.status = response.status === 200 ? ServiceStatus.UP : ServiceStatus.DOWN;
        } catch (error) {
            service.status = ServiceStatus.DOWN;
        }
    }


    init = async () => {
        const mock = await initMock();
        this.services.push(mock);
        this.gateway.register(mercuriusWithGateway, {
            graphiql: true,
            gateway: {
                services: this.services
            }
        })
        this.gateway.listen({ port: 4000 })
        this.startServicePolling();
    }

    startServicePolling = async () => {
        setInterval(async () => {
            const schema = await this.gateway.graphqlGateway.refresh()
            if (schema !== null) {
                this.gateway.graphql.replaceSchema(schema)
            }
        }, 2000)
    }


}