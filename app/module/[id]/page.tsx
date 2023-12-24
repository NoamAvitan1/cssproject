import  SingleModule  from "@/app/_module/SingleModule";


export default function page({params}:{params:{id:string}}){
  return (
    <div className="w-full h-full">
      <SingleModule id={params.id}/>
    </div>
  );
};
