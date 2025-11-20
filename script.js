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
            // =================== SARA - Join Our Team Form Validation (Unique 981) ===================

document.addEventListener("DOMContentLoaded", function () {

    // نمسك الفورم حق "Join Our Team"
    const sara_form_master_981 = document.querySelector(".form-card");
    if (!sara_form_master_981) {
        return; // لو مو هذي الصفحة، لا نسوي شيء
    }

    // نمسك الحقول اللي نحتاجها
    const sara_input_first_981   = sara_form_master_981.querySelector("input[name='first_name']");
    const sara_input_last_981    = sara_form_master_981.querySelector("input[name='last_name']");
    const sara_input_email_981   = sara_form_master_981.querySelector("input[name='email']");
    const sara_input_dob_981     = sara_form_master_981.querySelector("input[name='dob']");
    const sara_input_expert_981  = sara_form_master_981.querySelector("input[name='expertise']");
    const sara_input_skills_981  = sara_form_master_981.querySelector("input[name='skills']");
    const sara_input_edu_981     = sara_form_master_981.querySelector("textarea[name='education']");
    const sara_input_photo_981   = sara_form_master_981.querySelector("input[name='photo']");
    const sara_input_message_981 = sara_form_master_981.querySelector("textarea[name='message']"); // اختياري

    // نخزن كل الحقول في Array عشان نسهل شغل الحقول الفارغة
    const sara_all_required_fields_981 = [
        sara_input_first_981,
        sara_input_last_981,
        sara_input_email_981,
        sara_input_dob_981,
        sara_input_expert_981,
        sara_input_skills_981,
        sara_input_edu_981
        // الصورة بنفحصها لوحدها
    ];

    // 1) نطفي فاليديشن المتصفح للإيميل (نخلي التحكم لنا)
    if (sara_input_email_981) {
        sara_input_email_981.setAttribute("type", "text");
    }

    // 2) نخلي الكالندر ما يسمح بعد 2008 من الجافاسكربت (بدون تعديل HTML)
    if (sara_input_dob_981) {
        sara_input_dob_981.setAttribute("max", "2008-12-31");
    }

    // كائن لتخزين عناصر رسائل الخطأ عشان نقدر نمسحها بسهولة
    const sara_errors_map_981 = {};

    // دالة: تنظيف كل الأخطاء السابقة
    function sara_clear_all_errors_981() {
        // امسح حدود الحقول
        sara_all_required_fields_981.forEach(function (field) {
            if (field) {
                field.style.border = "";
            }
        });
        if (sara_input_photo_981) {
            sara_input_photo_981.style.border = "";
        }

        // امسح الرسائل
        Object.values(sara_errors_map_981).forEach(function (msgEl) {
            if (msgEl && msgEl.remove) {
                msgEl.remove();
            }
        });
        for (let key in sara_errors_map_981) {
            delete sara_errors_map_981[key];
        }
    }

    // دالة: تضيف خطأ تحت حقل معيّن
    function sara_add_error_for_field_981(fieldElement, messageText) {
        if (!fieldElement) return;

        const uniqueKey = fieldElement.name || fieldElement.id || Math.random().toString(36);

        // لو فيه رسالة قديمة لنفس الحقل، امسحها
        if (sara_errors_map_981[uniqueKey]) {
            sara_errors_map_981[uniqueKey].remove();
        }

        // نخلي البوردر أحمر
        fieldElement.style.border = "2px solid #d9534f";

        // ننشئ عنصر الرسالة
        const smallMsg = document.createElement("small");
        smallMsg.textContent = messageText;
        smallMsg.style.color = "#d9534f";
        smallMsg.style.fontSize = "14px";
        smallMsg.style.display = "block";
        smallMsg.style.marginTop = "4px";

        // نحط الرسالة بعد الحقل مباشرة
        fieldElement.insertAdjacentElement("afterend", smallMsg);

        // نخزن المرجع عشان نقدر نمسحه لاحقاً
        sara_errors_map_981[uniqueKey] = smallMsg;
    }

    // دالة: التحقق الكامل للفورم
    function sara_validate_join_form_981() {

        let sara_is_valid_981 = true;

        // أولاً نمسح الأخطاء
        sara_clear_all_errors_981();

        // 1) الحقول الفارغة الأساسية
        sara_all_required_fields_981.forEach(function (field) {
            if (field && field.value.trim() === "") {
                sara_add_error_for_field_981(field, "Please fill out this field.");
                sara_is_valid_981 = false;
            }
        });

        // 2) first name لا يبدأ برقم
        if (sara_input_first_981 && sara_input_first_981.value.trim() !== "") {
            const firstVal = sara_input_first_981.value.trim();
            if (/^\d/.test(firstVal)) {
                sara_add_error_for_field_981(
                    sara_input_first_981,
                    "First name cannot start with a number."
                );
                sara_is_valid_981 = false;
            }
        }

        // 3) last name لا يبدأ برقم (اختياري لكن نخليه احترافي)
        if (sara_input_last_981 && sara_input_last_981.value.trim() !== "") {
            const lastVal = sara_input_last_981.value.trim();
            if (/^\d/.test(lastVal)) {
                sara_add_error_for_field_981(
                    sara_input_last_981,
                    "Last name cannot start with a number."
                );
                sara_is_valid_981 = false;
            }
        }

        // 4) التحقق من صيغة الإيميل (بسيطة - لازم يحتوي @)
        if (sara_input_email_981 && sara_input_email_981.value.trim() !== "") {
            const emailVal = sara_input_email_981.value.trim();
            if (!emailVal.includes("@")) {
                sara_add_error_for_field_981(
                    sara_input_email_981,
                    "Please enter a valid email address (must contain '@')."
                );
                sara_is_valid_981 = false;
            }
        }

        // 5) الصورة: مطلوبة + لازم تكون Image
        if (sara_input_photo_981) {
            if (sara_input_photo_981.files.length === 0) {
                sara_add_error_for_field_981(
                    sara_input_photo_981,
                    "Please upload your photo."
                );
                sara_is_valid_981 = false;
            } else {
                const photoFile = sara_input_photo_981.files[0];
                if (!photoFile.type.startsWith("image/")) {
                    sara_add_error_for_field_981(
                        sara_input_photo_981,
                        "Only image files are allowed (JPG, PNG, etc.)."
                    );
                    sara_is_valid_981 = false;
                }
            }
        }

        // 6) DOB: يجب ألا تكون بعد 2008
        if (sara_input_dob_981 && sara_input_dob_981.value) {
            const dobDate = new Date(sara_input_dob_981.value);
            const year = dobDate.getFullYear();
            if (year > 2008) {
                sara_add_error_for_field_981(
                    sara_input_dob_981,
                    "DOB must be in 2008 or earlier."
                );
                sara_is_valid_981 = false;
            }
        }

        return sara_is_valid_981;
    }

    // حدث الإرسال
    sara_form_master_981.addEventListener("submit", function (event) {
        event.preventDefault();

        const allGood = sara_validate_join_form_981();

        if (!allGood) {
            // لو فيه أخطاء، لا نرسل الفورم
            return;
        }

        // لو كل شيء تمام: رسالة تأكيد + reset
        const firstNameVal = sara_input_first_981 ? sara_input_first_981.value.trim() : "";
        const lastNameVal  = sara_input_last_981 ? sara_input_last_981.value.trim() : "";
        const fullNameForMsg = (firstNameVal + " " + lastNameVal).trim();

        alert(
            "Thank you, " +
            (fullNameForMsg || "Applicant") +
            "! Your request to join Najdi Padel team has been submitted successfully."
        );

        // نفرغ الفورم ونمسح الأخطاء
        sara_form_master_981.reset();
        sara_clear_all_errors_981();
    });

});

        darkBtn.addEventListener("click", () => {
            document.body.classList.add("dark");
            localStorage.setItem("theme", "dark");
        });
    }
});
