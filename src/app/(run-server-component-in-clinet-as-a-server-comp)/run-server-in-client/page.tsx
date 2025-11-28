import Client from "@/components/clientComponents";
import ServerComponent from "@/components/serverComponent";
import style from "./h.module.css";

const page = () => {
  return (
    <div>
      <h1 className={style.title}>This is Title</h1>
      <Client>
        <ServerComponent />
      </Client>
    </div>
  );
};

export default page;
