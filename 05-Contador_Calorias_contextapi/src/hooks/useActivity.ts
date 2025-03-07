import { useContext } from "react";
import { ActivityContext } from "../context/ActivityContext";

export const useActivity = () => {
    const context = useContext(ActivityContext)
    if(!ActivityContext){
        throw new Error('useActivity must be used within an ActivityProvider')
    }

    return context
}