function slugify(text: string): string {
    return text
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") 
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D") 
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") 
      .replace(/[^\w\-]+/g, "");
  }
  
  export default slugify;
  