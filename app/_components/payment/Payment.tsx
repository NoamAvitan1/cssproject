'use client'
import { FaCcPaypal } from "react-icons/fa6";
import { FaCcVisa } from "react-icons/fa6";
import { FaCcMastercard } from "react-icons/fa6";


type Props = {};

export const Payment = (props: Props) => {
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        
    }
  return (
    <div className="mt-10 flex flex-col gap-10 h-full w-full items-center">
        <div className="flex gap-[3px]">
            <FaCcPaypal className="text-blue-600 text-4xl"/>
            <FaCcMastercard className="text-4xl text-orange-400"/>
            <FaCcVisa className="text-blue-600 text-4xl"/>
        </div>
      <form action="" onSubmit={(e)=>handleSubmit(e)} className="flex flex-col gap-8 w-[400px]">
        <input
          name="Credit-number"
          required
          placeholder="Credit number"
          className="border-b-2 p-px border-text bg-transparent focus:outline-none"
          type="text"
        />
        <section className="flex justify-center gap-4">
          <select defaultValue={2024} className="text-black [&_*]:text-black p-2" name="" id="">
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
            <option value="2028">2028</option>
            <option value="2029">2029</option>
            <option value="2030">2030</option>
          </select>
          <select defaultValue={1} className="text-black [&_*]:text-black p-2" id="month" name="month">
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </section>
        <input
          name="CVV"
          required
          placeholder="CVV"
          className="border-b-2 p-px border-text bg-transparent focus:outline-none"
          type="text"
        />
        <select className="text-black [&_*]:text-black p-3" name="payments" id="">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <button className="p-2 bg-secondary">Pay</button>
      </form>
    </div>
  );
};
