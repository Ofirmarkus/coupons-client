import { Notyf } from "notyf";

class NotificationService {

    private notify = new Notyf({ duration: 7000, position: { x: "right", y: "bottom" } });

    public success(message: string) {
        this.notify.success(message);
    }

    public error(err: any) {
        const message = this.extractErrorMessage(err);
        this.notify.error(message);
    }

    private extractErrorMessage(err: any) {
        // 1. front threw a string message
        if (typeof err === "string"){
           
            return err;
        } 
        
        // 2. Axios received a string error from backend
        if (typeof err.response?.data.message === "string") {
            
            
            return err.response.data;
        }
        
        // 3. Axios received an error array from backend
        if (Array.isArray(err.response?.data)){
          
            return err.response.data[0];
            
        } 
        
        // 4. front threw an Error: throw new Error("bla bla");
        if (typeof err.message === "string") {
           return err.message;
        }

        console.log(err);

        return "Unknown error, please try again";
    }

}

const notificationService = new NotificationService();
export default notificationService;