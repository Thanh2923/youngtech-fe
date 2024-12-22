import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function AlertClearCart({ handleClickClearItemCart,setIsAlertClear,totalCartItem=1 }) {
  


  return (
    
    <AlertDialog defaultOpen>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc chắn muốn xóa {totalCartItem} sản phẩm không?</AlertDialogTitle>
          <AlertDialogDescription>
            Sản phẩm sẽ được xóa khỏi giỏ hàng của bạn.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsAlertClear(false)}>
            Không
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => handleClickClearItemCart()}>
            Có
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
