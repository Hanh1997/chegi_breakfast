let func = {
    toast : async (heading,text,icon,position) => 
    {
        $.toast({
            heading: heading,
            text: text,
            icon: icon,  // Có thể là: success, info, warning, error
            position: position,
            stack: 5 // Số lượng toast tối đa hiển thị cùng lúc
        });
    },
     reduceSum : (items,filed) => {
        return items.reduce((total, item) => total + (item[`${filed}`] || 0), 0);
    }
}