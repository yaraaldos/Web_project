document.addEventListener("DOMContentLoaded", function () {
    const counters = document.querySelectorAll("#achievements .achievement h3");
    let started = false;

    function startCounting() {
        counters.forEach(counter => {
            let target = parseInt(counter.innerText.replace("+", ""));
            let count = 0;

            let step = Math.ceil(target / 70);

            function updateCounter() {
                count += step;

                if (count < target) {
                    counter.innerText = "+" + count;
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = "+" + target;
                }
            }

            updateCounter();
        });
    }


    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !started) {
                started = true;
                startCounting();
            }
        });
    }, { threshold: 0.3 });

    const achievementsSection = document.querySelector("#achievements");
    if (achievementsSection) observer.observe(achievementsSection);
});
// Load saved theme on every page
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    }

    const lightBtn = document.getElementById("lightBtn");
    const darkBtn = document.getElementById("darkBtn");

    // Theme buttons exist ONLY in home page
    if (lightBtn && darkBtn) {

        lightBtn.addEventListener("click", () => {
            document.body.classList.remove("dark");
            localStorage.setItem("theme", "light");
        });
           

//-----------------------------------Aleen managestaff-----------------------------------


document.addEventListener("DOMContentLoaded", function() {

  // Array of staff IDs
  let staffArray = ["staff1","staff2","staff3","staff4"];

  // Load deleted staff from localStorage
  let deletedStaff = JSON.parse(localStorage.getItem("deletedStaff")) || [];

  // Hide deleted staff on page load
  deletedStaff.forEach(id => {
    let element = document.querySelector(`[data-id="${id}"]`);
    if(element) element.remove();
  });

  // Delete selected staff
  document.getElementById("deleteBtn").addEventListener("click", function() {
    const selected = staffArray.filter(id => {
      const checkbox = document.getElementById(id);
      return checkbox && checkbox.checked;
    });

    if(selected.length === 0){
      alert("Please select at least one staff to delete.");
      return;
    }

    if(!confirm("Are you sure you want to delete this staff?")) return;

    selected.forEach(id => {
      const item = document.querySelector(`[data-id="${id}"]`);
      if(item) item.remove();
      if(!deletedStaff.includes(id)) deletedStaff.push(id);
    });

    localStorage.setItem("deletedStaff", JSON.stringify(deletedStaff));
    alert("Staff deleted successfully!");
  });

  // Helper functions to validate input
  function isValidName(name) {
    return /^[a-zA-Z\s]+$/.test(name); // أحرف ومسافات فقط
  }

  function isValidText(text) {
    return /^[a-zA-Z0-9\s.,'-]+$/.test(text); // نصوص وأرقام ورموز بسيطة مسموح بها
  }

  // Add new staff
  document.getElementById("addStaffForm").addEventListener("submit", function(e){
    e.preventDefault();

    const firstName = document.getElementById("first_nameZZ").value.trim();
    const lastName  = document.getElementById("last_nameZZ").value.trim();
    const email     = document.getElementById("emailZZ").value.trim();
    const dob       = document.getElementById("dobZZ").value.trim();
    const expertise = document.getElementById("expertiseZZ").value.trim();

    // التحقق من الحقول الفارغة
    if(!firstName || !lastName || !email || !dob || !expertise){
      alert("Please fill in all required fields!");
      return;
    }

    // تحقق من نوع البيانات
    if(!isValidName(firstName)){
      alert("First name should contain letters only!");
      return;
    }

    if(!isValidName(lastName)){
      alert("Last name should contain letters only!");
      return;
    }

    if(!isValidText(expertise)){
      alert("Expertise should be valid text!");
      return;
    }

    const staffList = document.querySelector(".staff-listZZ");
    const newId = "staff" + (staffArray.length + 1);
    staffArray.push(newId);

    const li = document.createElement("li");
    li.className = "staff-itemZZ";
    li.setAttribute("data-id", newId);
    li.innerHTML = `
      <img src="images/default-profile.png" alt="${firstName}">
      <div class="staff-nameZZ">${firstName} ${lastName}</div>
      <div class="chk-wrapZZ"><input type="checkbox" id="${newId}"></div>
    `;
    staffList.appendChild(li);

    // Clear form
    document.getElementById("first_nameZZ").value = "";
    document.getElementById("last_nameZZ").value  = "";
    document.getElementById("emailZZ").value      = "";
    document.getElementById("dobZZ").value        = "";
    document.getElementById("expertiseZZ").value  = "";
    document.getElementById("skillsZZ").value     = "";
    document.getElementById("educationZZ").value  = "";
    document.getElementById("photoZZ").value      = "";
  });

});






//------------------------Aleen FAQ-------------------


document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    const icon = item.querySelector(".plus-icon");

    question.addEventListener("click", () => {
      // إغلاق كل الفتحات الأخرى
      document.querySelectorAll(".faq-answer").forEach(ans => {
        if (ans !== answer) {
          ans.style.display = "none";
        }
      });

      document.querySelectorAll(".plus-icon").forEach(ic => {
        if (ic !== icon) {
          ic.classList.remove("open");
        }
      });

      // فتح/إغلاق الإجابة الحالية
      if (answer.style.display === "block") {
        answer.style.display = "none";
        icon.classList.remove("open");
      } else {
        answer.style.display = "block";
        icon.classList.add("open");
      }
    });
  });
});




//-------------------------------------------Aleen Serv page------------------------------




/* ========== Simple sorter for each section ========== */
function setupSorter(selectId, containerId) {
  const select = document.getElementById(selectId);
  const container = document.getElementById(containerId);
  if (!select || !container) return;

  const getName = (card) =>
    (card.querySelector("h3")?.textContent || "").trim().toLowerCase();

  const getPrice = (card) => {
    const raw = card.querySelector(".priceZZ")?.textContent || "0";
    const num = parseFloat(raw.replace(/[^0-9.]/g, ""));
    return isNaN(num) ? 0 : num;
  };

  function sortAndRender(mode) {
    const items = Array.from(container.children);

    items.sort((a, b) => {
      switch (mode) {
        case "name-ascZZ":
          return getName(a).localeCompare(getName(b));
        case "name-descZZ":
          return getName(b).localeCompare(getName(a));
        case "price-low-highZZ":
          return getPrice(a) - getPrice(b);
        case "price-high-lowZZ":
          return getPrice(b) - getPrice(a);
        default:
          return 0;
      }
    });

    items.forEach((el) => container.appendChild(el));
  }

  select.addEventListener("change", (e) => sortAndRender(e.target.value));
}

/* ========== Run after page load ========== */
document.addEventListener("DOMContentLoaded", function () {
  // Sorting
  setupSorter("sortBy1ZZ", "serviceContainer1ZZ");
  setupSorter("sortBy2ZZ", "serviceContainer2ZZ");
  setupSorter("sortBy3ZZ", "serviceContainer3ZZ");

  // Wishlist Buttons
  document.querySelectorAll(".serviceZZ").forEach((card, index) => {
    const btn = document.createElement("button");
    btn.className = "wishlist-btn";
    btn.type = "button";
    btn.setAttribute("aria-label", "Add to wishlist");

    const key = "wishlist_" + index;

    if (localStorage.getItem(key) === "true") {
      btn.classList.add("active");
    }

    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
      localStorage.setItem(key, btn.classList.contains("active"));
    });

    card.appendChild(btn);
  });
});


// =================================joud-provider page=====================================
  //to loads and display all services from localStorage 
        function provider_displayServices() {
         
        // get the string stored in localStorage and  save to services array
        var stored = localStorage.getItem("services");
        var services = stored ? JSON.parse(stored) : [];

        // find the element that will hold all cards
        var container = document.querySelector(".provider-cards");
        if (!container) return;
         
        // clear the container before adding
        container.innerHTML = "";

        // get the if empty message 
        var emptyMsg = document.getElementById("provider_emptyMessage");

        //if there are no services stored:show message
        if (services.length === 0) {
            if (emptyMsg) emptyMsg.style.display = "block";
            return;
        }

        //else:hide message
        if (emptyMsg) emptyMsg.style.display = "none";

        // create cards by looping through each service in services list
        services.forEach(s => {

            // create a new card <div> 
            var card = document.createElement("div");
            card.className = "provider-service-card swiper-slide";

            // create <img> and set the image to the saved image then attach it inside the card
            var img = document.createElement("img");
            img.src = s.image;
            card.appendChild(img);

          
            // add service name
            var title = document.createElement("h3");
            title.textContent = s.name;
            card.appendChild(title);

            // add service description and style
            var desc = document.createElement("p");
            desc.textContent = s.description;
            desc.style.color = "#555";
            desc.style.marginTop = "6px";
            card.appendChild(desc);

            //add the service price and style
            var price = document.createElement("p");
            price.textContent = s.price + " SR";
            price.style.marginTop = "8px";
            card.appendChild(price);

            // append the card to the services container
            container.appendChild(card);
        });

        // display Swiper depending on count
        setTimeout(() => {
            let count = services.length;

            // if 4 or fewer cards :no arrows
            if (count <= 4) {

                document.querySelector(".swiper-button-next").style.display = "none";
                document.querySelector(".swiper-button-prev").style.display = "none";
                
                container.style.justifyContent = "center";
                new Swiper(".provider-swiper", {
                    slidesPerView: count,
                    spaceBetween: 30,
                    allowTouchMove: false
                });

                return;
            }

            // if > 4 show arrows 
            document.querySelector(".swiper-button-next").style.display = "block";
            document.querySelector(".swiper-button-prev").style.display = "block";
            container.style.justifyContent = "flex-start";
            new Swiper(".provider-swiper", {
                    slidesPerView: 4,
                    spaceBetween: 10,

        // enable arrow controls
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        }
    });

        }, 50); // Wait 50ms before
    }

    // run the function when html is loaded
    window.addEventListener("DOMContentLoaded", provider_displayServices);

// ============================joud-addservice page==========================================
function addService_save(event) {

            // Stop page refresh so we can handle data saving 
            event.preventDefault();

           // get the service data and remove spaces from start/end
            var addservice_name = document.getElementById("addService_name").value.trim();
            var addservice_price = document.getElementById("addService_price").value.trim();
            var addservice_desc = document.getElementById("addService_description").value.trim();
            var fileInput = document.getElementById("addService_image");

                // Check if any field is empty 
            if (!addservice_name || !addservice_price || !addservice_desc || fileInput.files.length === 0) {
                alert("Please fill in all fields.");
                return;
            }

                // make sure service name not start with a number
            if (/^[0-9]/.test(addservice_name)) {
                alert("Service name cannot start with numbers.");
                return;
            }

            //make sure price is a number
            if (isNaN(addservice_price)) {
                alert("Price must be a number.");
                return;
            }

            // Convert the image file into a string to save it in localStorage
            var file = fileInput.files[0];
            var reader = new FileReader();

            reader.onload = function(e) {

                 // create a new service object 
                var newService = {
                    name: addservice_name,
                    price: addservice_price,
                    description: addservice_desc,
                    image: e.target.result   
                };

                // get old services from storage 
                var old = localStorage.getItem("services");
                var services = old ? JSON.parse(old) : [];

                 // add the new service to the list
                services.push(newService);

                //save list to local storage 
                localStorage.setItem("services", JSON.stringify(services));

                alert("Service added successfully!");

                // clear the form fields after saving
                document.getElementById("addService_name").value = "";
                document.getElementById("addService_price").value = "";
                document.getElementById("addService_description").value = "";
                document.getElementById("addService_image").value = "";
            };

            reader.readAsDataURL(file);
        }

        // run only on add service page
        var btn = document.getElementById("addService_button");
        if (btn) btn.addEventListener("click", addService_save);

//=============================================================================


