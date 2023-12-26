'use client'
import { BaseSyntheticEvent } from "react";
import { FaCcPaypal } from "react-icons/fa6";
import { FaCcVisa } from "react-icons/fa6";
import { FaCcMastercard } from "react-icons/fa6";
import Api from "@/utils/axios";
import { tell } from "../teller/Tale";
import { object, number } from "yup";
import * as yup from "yup";
import { useRouter, useSearchParams } from "next/navigation";


type Props = {};

export const Payment = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
    const authSchema = () => {
        return object({
          creditNumber: number().required().test('len', 'Credit number should be 16 digits', (val) => val.toString().length === 16),
          cvv: number().required().test('len', 'Cvv should be 3 digits', (val) => val.toString().length === 3),
        })
      };
    const handleSubmit = async(e:BaseSyntheticEvent) => {
      e.preventDefault();
      const user_id = searchParams.get('user_id');
      const module_id = searchParams.get('module_id');
      const price = searchParams.get('price');
      const moduleData = {
        user_id : user_id,
        module_id : module_id,
        price : price,
      }
      if(!user_id || !module_id || !price){
        tell('Not selected module','error')
        router.push('/');
        return;
      }
        try {
        const inputs = e.target.elements;
        let forValidation = {
          creditNumber: inputs.creditNumber?.value,
          cvv: inputs.cvv?.value,
        };
        authSchema().validate(forValidation).then(async()=> {
          const {data} = await Api.post(`/module/payment`,moduleData)
          if (data?.error) {
            tell(data.error, 'error')
            return;
          }
          tell('Module purchased successfully','success')
          router.push(`/module/${module_id}`)
        }).catch((error: yup.ValidationError) => {
          tell(error.message, 'error')
        })
      } 
        catch (error:any) {
          tell(error, 'error')
        }
    }
  return (
    <div className="mt-10 flex flex-col gap-10 h-full w-full items-center">
        <div className="flex gap-[3px]">
            <FaCcPaypal className="text-blue-600 text-4xl"/>
            <FaCcMastercard className="text-4xl text-orange-400"/>
            <FaCcVisa className="text-blue-600 text-4xl"/>
        </div>
      <form action="" onSubmit={(e)=>handleSubmit(e)} className="flex flex-col gap-8 w-[320px] sm:w-[450px]">
        <section className="flex flex-col gap-2">
          <label htmlFor="">Credit number:</label>
          <input
            name="creditNumber"
            required
            placeholder="1111 2222 3333 4444"
            className="border-b-2 p-px border-text bg-transparent focus:outline-none"
            type="text"
          />
        </section>
        <section className="flex flex-col justify-between gap-4">
          <label htmlFor="">Credit validity:</label>
          <div className="flex gap-2">
            <select defaultValue={2024} className="text-black [&_*]:text-black p-2 w-1/2" name="" id="">
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
              <option value="2030">2030</option>
            </select>
            <select defaultValue={1} className="text-black [&_*]:text-black p-2 w-1/2" id="month" name="month">
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
          </div>
        </section>
        <section className="flex flex-col gap-2">
          <label htmlFor="">(CVV)Card security code:</label>
          <input
            name="cvv"
            required
            placeholder="123"
            className="border-b-2 p-px border-text bg-transparent focus:outline-none"
            type="text"
          />
        </section>
        <section className="flex flex-col gap-2">
          <label htmlFor="">Number of payments:</label>
          <select className="text-black [&_*]:text-black p-3" name="payments" id="">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </section>
        <button className="p-2 bg-secondary">Pay</button>
      </form>
    </div>
  );
};
