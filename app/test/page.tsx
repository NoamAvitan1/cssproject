import { Modal } from "../_components/common/Modal";
import { Test as T } from "../_components/test/Test";
import { AddModule } from "../_module/AddModule";
export default async function Test() {
  return (
    <div className="w-full">
     {/* <Bucket/> */}
     <T />
     <AddModule/>
    </div>
  );
}
