import NavbarCustomer from "@/components/infoCustomer/navbar/NavbarCustomer";


type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }:Props) {
  return (
      <>
   <div className="w-full  flex justify-center items-center">
       <div className="w-[90%] flex justify-between items-center">
       <NavbarCustomer/>
       <main className="w-3/4">{children}</main>
       </div>
   </div>
    
      </>
  
  );
}