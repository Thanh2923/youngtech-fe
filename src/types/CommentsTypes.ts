
export interface Comments {
    id: number; 
    content: string;
    customer_id:number;
    product_id:number;
  }

  export interface CommentsState {
    comments: Comments[];
    loading: boolean;
    error: string | null;
  }
  
