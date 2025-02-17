document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault(); // Ngăn chặn form gửi ngay lập tức

  var messageBox = document.getElementById("message");
  var submitButton = document.getElementById("submit-button");
  messageBox.textContent = "Submitting..";
  messageBox.style.display = "block";
  submitButton.disabled = true;

  var formData = new FormData(this);
  var keyValuePairs = [];
  for (var pair of formData.entries()) {
    keyValuePairs.push(pair[0] + "=" + encodeURIComponent(pair[1]));
  }
  var formDataString = keyValuePairs.join("&");

  // Gửi dữ liệu lên Google Script
  fetch("https://script.google.com/macros/s/AKfycbziHjgDFXgd89c2eucweIeQ4bVM0znwUI6W932nlqlY5x1nf8uiCNBkvIcxsaiZvECs/exec", {
    redirect: "follow",
    method: "POST",
    body: formDataString,
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
  })
  .then(response => response.json())
  .then(data => {
    messageBox.textContent = "Data submitted successfully!";
    messageBox.style.backgroundColor = "green";
    messageBox.style.color = "beige";
    submitButton.disabled = false;
    document.getElementById("form").reset();

    setTimeout(function () {
      messageBox.textContent = "";
      messageBox.style.display = "none";
      var statusContainer = document.getElementById("status-container");
      if (statusContainer) {
        statusContainer.setAttribute("data-status", "success");
        // Chuyển trang khi trạng thái thành công
        window.location.href = "dessert.html"; // Chuyển trang ở đây
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
});

function getNewRecord(){
document.getElementById("form").reset();
};
