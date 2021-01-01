import axios from "@/utils/axios";
import * as comfig from "./comfig";

export const articlePost = () => axios.get(comfig.articlePost);
export const userLog = () => axios.get(comfig.userLog);
