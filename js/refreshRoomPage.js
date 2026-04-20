const initRoomPage = async () => {
    try {
        const response = await fetch(
            "https://127.0.0.1:3000/api/user/roomInfoRetrieve",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestData),
            },
        );
        
        const result = await response.json();
        
        if (result.code === 200) {
            const room = Array.isArray(result.data)
            ? result.data[0]
            : result.data;
            console.log("正在處理的房間對象:", room);
            
            if (room) {
                // 1. 標題 (檢查 ID: roomTitle, roomHeader)
                const titleEl =
                document.getElementById("roomTitle");
                const headerEl =
                document.getElementById("roomHeader");
                if (titleEl) titleEl.textContent = room.type_name;
                if (headerEl) headerEl.textContent = room.type_name;
                
                // 2. 價格 (檢查 ID: roomPrice)
                const priceEl =
                document.getElementById("roomPrice");
                if (priceEl) {
                    priceEl.innerHTML = `$${room.base_price} <small>/ night</small>`;
                }
                
                // 3. 圖片 (檢查 ID: roomMainImage)
                const imgEl =
                document.getElementById("roomMainImage");
                if (imgEl) imgEl.src = room.image_url;
                
                // console.log("hello")
                
                // console.log(room.numOfAvailable)
                sessionStorage.setItem("numOfAvailable", room.numOfAvailable)
                
                // 4. 短描述 (檢查 ID: roomDesc)
                const descEl = document.getElementById("roomDesc");
                if (descEl)
                    descEl.textContent = room.short_description;
                
                // --- 新增：處理 JSON 拿到的資料 ---
                
                // 5. 長描述 (檢查你的 HTML 標籤 ID 是否為 roomLongDesc)
                const longDescEl =
                document.getElementById("roomLongDesc");
                if (longDescEl && room.longDes) {
                    longDescEl.innerHTML = room.longDes;
                }
                
                // 6. 設施列表 (檢查你的 <ul> ID 是否為 amenitiesList)
                const listEl =
                document.getElementById("amenitiesList");
                if (listEl && Array.isArray(room.amenities)) {
                    listEl.innerHTML = ""; // 清空靜態文字
                    room.amenities.forEach((item) => {
                        const li = document.createElement("li");
                        li.textContent = item;
                        listEl.appendChild(li);
                    });
                }
            }
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
}; // 確保頁面加載後執行
// window.addEventListener("DOMContentLoaded", initRoomPage);
window.addEventListener("DOMContentLoaded", () => {
    initRoomPage(); // 頁面加載時跑數據
    const btn = document.getElementById("submitBooking");
    if (btn) btn.addEventListener("click", submitBooking);
});
