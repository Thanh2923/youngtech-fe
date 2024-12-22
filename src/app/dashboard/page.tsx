import { ChartComponent } from "@/components/dashboard/chart/Chart"
import { PieChartComponent } from "@/components/dashboard/chart/PieChart"


const page = () => {
  return (
   <>
    <div className="w-full flex gap-5 justify-between items-center">
        <div className="w-[24%] h-[200px] border rounded-lg bg-slate-100">
           <div className="flex h-[100px] py-7">
              <div className="w-[50%] px-5 flex-col flex ">
                 <h3 className="font-semibold">Budget</h3>
              </div>
              <div className="w-[50%] flex items-center justify-center">
                <div className="w-[50px] h-[50px] rounded-full bg-slate-900">
                           
                </div>
              </div>
           </div>
           <div className="tatal ps-7">
           <span>123.000.000đ</span>
            <div className="flex gap-2 items-center ">
               <span>+ 12%</span> <p>Kể từ tháng trước</p>
            </div>
           </div>
        </div>
        <div className="w-[24%] h-[200px] border rounded-lg bg-slate-100">
           <div className="flex h-[100px] py-7">
              <div className="w-[50%] px-5 flex-col flex ">
                 <h3 className="font-semibold">Budget</h3>
              </div>
              <div className="w-[50%] flex items-center justify-center">
                <div className="w-[50px] h-[50px] rounded-full bg-slate-900">
                           
                </div>
              </div>
           </div>
           <div className="tatal ps-7">
           <span>123.000.000đ</span>
            <div className="flex gap-2 items-center ">
               <span>+ 12%</span> <p>Kể từ tháng trước</p>
            </div>
           </div>
        </div>
        <div className="w-[24%] h-[200px] border rounded-lg bg-slate-100">
           <div className="flex h-[100px] py-7">
              <div className="w-[50%] px-5 flex-col flex ">
                 <h3 className="font-semibold">Budget</h3>
              </div>
              <div className="w-[50%] flex items-center justify-center">
                <div className="w-[50px] h-[50px] rounded-full bg-slate-900">
                           
                </div>
              </div>
           </div>
           <div className="tatal ps-7">
           <span>123.000.000đ</span>
            <div className="flex gap-2 items-center ">
               <span>+ 12%</span> <p>Kể từ tháng trước</p>
            </div>
           </div>
        </div>
        <div className="w-[24%] h-[200px] border rounded-lg bg-slate-100">
           <div className="flex h-[100px] py-7">
              <div className="w-[50%] px-5 flex-col flex ">
                 <h3 className="font-semibold">Budget</h3>
              </div>
              <div className="w-[50%] flex items-center justify-center">
                <div className="w-[50px] h-[50px] rounded-full bg-slate-900">
                           
                </div>
              </div>
           </div>
           <div className="tatal ps-7">
           <span>123.000.000đ</span>
            <div className="flex gap-2 items-center ">
               <span>+ 12%</span> <p>Kể từ tháng trước</p>
            </div>
           </div>
        </div>
    </div>
    <section className="w-full py-5 justify-between flex ">
         <div className="w-[70%]">
          <ChartComponent/>
         </div>
         <div className="w-[29%]">
        <PieChartComponent/>
         </div>
    </section>
   </>
  )
}

export default page
