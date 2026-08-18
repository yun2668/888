document.addEventListener("DOMContentLoaded", () => {

  // ==============================
  // 手機版選單
  // ==============================

  const menuBtn = document.getElementById("menuBtn");
  const mainNav = document.getElementById("mainNav");

  if (menuBtn && mainNav) {

    menuBtn.addEventListener("click", () => {

      const open = mainNav.classList.toggle("open");

      menuBtn.setAttribute(
        "aria-expanded",
        String(open)
      );

    });

    mainNav
      .querySelectorAll("a")
      .forEach(link => {

        link.addEventListener("click", () => {

          mainNav.classList.remove("open");

          menuBtn.setAttribute(
            "aria-expanded",
            "false"
          );

        });

      });

  }


  // ==============================
  // 機車定檢期限試算
  // ==============================

  const issueMonth =
    document.getElementById("issueMonth");

  const calcBtn =
    document.getElementById("calcDeadline");

  const result =
    document.getElementById("deadlineResult");


  function monthName(month) {

    return `${month} 月`;

  }


  function calcInspectionWindow() {

    if (!issueMonth || !result) {
      return;
    }


    const month =
      Number(issueMonth.value);


    // 沒有選月份

    if (!month) {

      result.innerHTML = `
        <span class="result-small">
          尚未選擇月份
        </span>

        <strong>
          請先選擇行車執照原發照月份
        </strong>
      `;

      return;

    }


    // 前一個月

    const previous =
      month === 1
        ? 12
        : month - 1;


    // 後一個月

    const next =
      month === 12
        ? 1
        : month + 1;


    let dateText = "";


    // ==============================
    // 1 月
    // ==============================

    if (month === 1) {

      dateText =
        "前一年 12 月 1 日至當年 2 月底";

    }


    // ==============================
    // 12 月
    // ==============================

    else if (month === 12) {

      dateText =
        "當年 11 月 1 日至次年 1 月 31 日";

    }


    // ==============================
    // 其他月份
    // ==============================

    else {

      // 取得後一個月的最後一天

      const lastDay =
        new Date(
          2024,
          next,
          0
        ).getDate();


      dateText =
        `${previous} 月 1 日至 ` +
        `${next} 月 ${lastDay} 日`;

    }


    // 顯示結果

    result.innerHTML = `

      <span class="result-small">
        原發照月份：
        ${monthName(month)}
      </span>

      <strong>
        可定檢月份：
        ${monthName(previous)}
        ～
        ${monthName(next)}
      </strong>

      <p>
        依「原發照月份前後 1 個月」規則，
        約為 ${dateText}。
        正式期限請再以環境部官方系統確認。
      </p>

    `;

  }


  // ==============================
  // 點擊「立即試算」
  // ==============================

  if (calcBtn) {

    calcBtn.addEventListener(
      "click",
      calcInspectionWindow
    );

  }


  // ==============================
  // 選擇月份後自動計算
  // ==============================

  if (issueMonth) {

    issueMonth.addEventListener(
      "change",
      calcInspectionWindow
    );

  }


  // ==============================
  // 圖片載入失敗備援
  // ==============================

  document
    .querySelectorAll("img")
    .forEach(img => {

      img.addEventListener(
        "error",
        () => {

          // 隱藏載入失敗圖片

          img.style.display =
            "none";


          const parent =
            img.parentElement;


          // 沒有父元素就停止

          if (!parent) {
            return;
          }


          // 防止重複建立備援圖片

          if (
            parent.querySelector(
              ".image-fallback"
            )
          ) {

            return;

          }


          const fallback =
            document.createElement("div");


          fallback.className =
            "image-fallback";


          fallback.style.cssText = `

            min-height:260px;

            display:grid;

            place-items:center;

            padding:30px;

            background:
            linear-gradient(
              135deg,
              #e7f6f1,
              #eaf5fb
            );

            color:#0d594d;

            font-weight:900;

            text-align:center;

            font-size:20px;

          `;


          fallback.innerHTML = `

            <div>

              <div
                style="
                  font-size:52px;
                  margin-bottom:10px;
                "
              >
                🛵
              </div>

              機車排氣定期檢驗

            </div>

          `;


          parent.prepend(
            fallback
          );

        }

      );

    });


  // ==============================
  // FAQ 展開時平滑捲動
  // ==============================

  document
    .querySelectorAll(
      ".faq-list details"
    )
    .forEach(item => {

      item.addEventListener(
        "toggle",
        () => {

          if (item.open) {

            // 將其他 FAQ 關閉
            document
              .querySelectorAll(
                ".faq-list details"
              )
              .forEach(other => {

                if (
                  other !== item
                ) {

                  other.open =
                    false;

                }

              });

          }

        }

      );

    });


});
