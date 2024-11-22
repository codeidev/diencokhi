import Link from "next/link";

export default function Footer() {
  return (
    <>
      <section className="footer">
        <div className="container">
          <div className="row">
            <div className="col-3">
              <div className="box">
                <p className="footertitle">Nạp tiền và tải file (24/7)</p>
                <p className="footercontent">
                  Hỗ trợ tự động mọi thời gian trong ngày
                </p>
              </div>
              <div className="box">
                <p className="footertitle">Đội ngũ hỗ trợ online (T2 - T7)</p>
                <p className="footercontent">Sáng: Từ 7h30 đến 11h30</p>
                <p className="footercontent">Chiều: Từ 13h30 đến 17h30</p>
                <p className="footercontent">
                  (CN và các ngày lễ nghỉ, TV cần hỗ trợ liên hệ lại trong giờ
                  hành chính)
                </p>
              </div>
            </div>
            <div className="col-3">
              <div className="box">
                <p className="footertitle">Chính sách dành cho người mua</p>
                <p>
                  <a href={`/instruct`}>Hướng dẫn tải miễn phí</a>
                </p>
                <p>
                  <a href={`/instruct`}>Hướng dẫn tải có phí</a>
                </p>
              </div>
            </div>
            <div className="col-3">
              <div className="box">
                <p className="footertitle">Cộng đồng bmdiencokhi.vn</p>
                <div className="iconcontact">
                  <a href="#">
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                  <a href="#">
                    <i className="fa-brands fa-youtube"></i>
                  </a>
                </div>
                <img src="/assets/img/worldmap.png" alt="" />
              </div>
            </div>
            <div className="col-3">
              <div className="box">
                <p className="footertitle">Chính sách dành cho người mua</p>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.454506540599!2d106.62420897405472!3d10.852993989300494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752bee0b0ef9e5%3A0x5b4da59e47aa97a8!2sQuang%20Trung%20Software%20City!5e0!3m2!1sen!2s!4v1726142613440!5m2!1sen!2s"
                  width="100%"
                  height="80%"
                  style={{border: '0'}}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="footer-con">
        <div className="container">
          <div className="row">
            <div className="col-2">
              <img src="/assets/img/logo.png" alt="" />
            </div>
            <div className="col-6">
              <div className="top">
                <a href="#">Giới thiệu</a>
                <a href="#">Quy định chung</a>
                <a href="#">Sự kiện</a>
              </div>
              <div className="bottom">
                <p>
                  <a href="#">Hotline: 000.000.000</a>&nbsp; - &nbsp;
                  <a href="#">Email: bmdiencokhi.vn@gmail.com</a>
                </p>
              </div>
            </div>
            <div className="col-4">
              <div className="fullbox">
                <p>
                  Copyrights © bmdiencokhi.vn
                  <br className="hidden-xs hidden-sm" />
                </p>
                <p>
                  <a href="/privacy-policy.htm" rel="nofollow">
                    Privacy Policy
                  </a>
                  | Nội dung đã được bảo vệ bản quyền
                  <br className="hidden-xs hidden-sm" />
                </p>

                <a
                  href="https://www.dmca.com/Protection/Status.aspx?ID=e3cfb854-1733-4462-a9e8-0ef4661d6600&amp;refurl=https://khobanve.vn/"
                  title="DMCA.com Protection Status"
                  className="dmca-badge"
                >
                  <br />
                  <img
                    src="//images.dmca.com/Badges/dmca-badge-w150-5x1-09.png?ID=e3cfb854-1733-4462-a9e8-0ef4661d6600"
                    alt="DMCA.com Protection Status"
                  />
                </a>
              </div>
              <script src="//images.dmca.com/Badges/DMCABadgeHelper.min.js"></script>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
