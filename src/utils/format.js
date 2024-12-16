// Chuyển số sang định dạng tiền tệ
export const formatMoney = (value) => {
  if (value === null || value === undefined) return "0";
  return new Intl.NumberFormat("en-US").format(value);
};

// Chuyển đổi định dạng ngày từ yyyy-MM-dd sang dd/MM/yyyy
export const formatDate = (dateString) => {
    if(dateString !== null){
      const date = new Date(dateString);
  
      const day = ("0" + date.getDate()).slice(-2); // Đảm bảo ngày có 2 chữ số
      const month = ("0" + (date.getMonth() + 1)).slice(-2); // Tháng bắt đầu từ 0, cần cộng thêm 1
      const year = date.getFullYear();
      
      return `${day}/${month}/${year}`;
    }
   
};
