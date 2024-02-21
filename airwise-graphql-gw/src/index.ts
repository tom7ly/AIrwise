import { initApollo } from "./code-gen/initApollo";
import { initCGFederation } from "./code-gen/initCGFederation";
import { ServiceManager } from "./service-manager";




const init = async () => {
    try {
        const serviceManager = new ServiceManager();
        await serviceManager.init();
        // await initApollo();
        // await initCGFederation();
    } catch ({ error }) {
        console.error(`Error initializing app: ${error}`);

    }

}
init()