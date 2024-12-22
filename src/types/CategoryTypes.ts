 export interface Category_Paren {
    id: number; 
    name: string;
    idCateParen:number;
  }

  export interface Category_Child {
    id: number; 
    childCateName: string;
    parentCategory_id:number;
    name: string;
  }

  export interface CategoryParenState {
    categoryParent: Category_Paren[];
    loading: boolean;
    error: string | null;
    idCateParen :number;
  }
  export interface CategoryChildState {
    categoryChild: Category_Child[];
    nameCategory:Category_Child[];
    loading: boolean;
    error: string | null;
    idCateChild:number;
  }
  
