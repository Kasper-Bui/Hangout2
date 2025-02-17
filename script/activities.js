
      function sendToGoogleSheet() {
          let now = new Date();
          let datetime = now.toLocaleString(); // Lấy ngày + giờ (dd/mm/yyyy, hh:mm:ss)
         // document.getElementById('demo').innerHTML = datetime; // Hiển thị lên web

          // Lấy các hoạt động đã chọn
          let activities = [];
          let checkboxes = document.querySelectorAll('input[name="ACTIVITIES"]:checked');
          checkboxes.forEach(checkbox => {
            activities.push(checkbox.value);
          });

          // Tạo dữ liệu dạng key-value
          let data = {
              "DAY": datetime, // Ngày và giờ
              "ACTIVITIES": activities.join(", ") // Các hoạt động đã chọn, nối thành chuỗi
          };

          // Chuyển dữ liệu thành chuỗi URL-encoded
          let formData = Object.keys(data).map(key => key + "=" + encodeURIComponent(data[key])).join("&");

          // Hiển thị thông báo gửi dữ liệu
          let messageBox = document.getElementById("message");
          let submitButton = document.getElementById("submit-button");
          messageBox.textContent = "Submitting..";
          messageBox.style.display = "block";
          submitButton.disabled = true;


          // Gửi dữ liệu đến Google Apps Script
          fetch("https://script.google.com/macros/s/AKfycbziHjgDFXgd89c2eucweIeQ4bVM0znwUI6W932nlqlY5x1nf8uiCNBkvIcxsaiZvECs/exec", {
              method: "POST",
              headers: {
                  "Content-Type": "application/x-www-form-urlencoded", // Đảm bảo sử dụng đúng kiểu gửi
              },
              body: formData // Gửi dữ liệu dưới dạng x-www-form-urlencoded
          })
          .then(response => response.json()) // Phân tích phản hồi từ server
          .then(result => {
              messageBox.textContent = "Data submitted successfully!";
              messageBox.style.backgroundColor = "green";
              messageBox.style.color = "beige";
              submitButton.disabled = false;
              document.getElementById("form").reset(); // Reset form

              // Đợi 2 giây rồi chuyển trang
              setTimeout(function () {
                messageBox.textContent = "";
                messageBox.style.display = "none";
                var statusContainer = document.getElementById("status-container");
                if (statusContainer) {
                  statusContainer.setAttribute("data-status", "success");
                  // Chuyển hướng đến trang mới
                  window.location.href = "lastpage.html"; // Thay "lastpage.html" bằng URL trang bạn muốn chuyển đến
                } else {
                  console.error("Không tìm thấy phần tử #status-container");
                }
              }, 2000); // Đợi 2 giây rồi cập nhật status
          })
          .catch(error => {
              console.error(error);
              messageBox.textContent = "An error occurred while submitting the form.";
              messageBox.style.display = "block";
          });
      }
