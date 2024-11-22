// pages/api/payment.js
import axios from 'axios';
import crypto from 'crypto';

const accessKey = "F8BBA842ECF85"; // Mã truy cập
const secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz"; // Khóa bí mật
const partnerCode = "MOMO";

export default async function handler(req, res) {
    console.log("Request body:", req.body);
    console.log("Request method:", req.method); // Ghi log phương thức yêu cầu
    if (req.method === 'POST') {
      const { amount, orderInfo, redirectUrl, ipnUrl } = req.body;
  
      // Tạo ID đơn hàng và chữ ký
      const orderId = partnerCode + new Date().getTime();
      const requestId = orderId;
      const extraData = "";
      const autoCapture = true;
      const lang = "vi";
  
      const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=payWithMethod`;
      
      const signature = crypto.createHmac("sha256", secretKey).update(rawSignature).digest("hex");
  
      const requestBody = {
        partnerCode,
        partnerName: "Test",
        storeId: "MomoTestStore",
        requestId,
        amount,
        orderId,
        orderInfo,
        redirectUrl,
        ipnUrl,
        lang,
        requestType: "payWithMethod",
        autoCapture,
        extraData,
        signature,
      };
  
      try {
        const result = await axios.post("https://test-payment.momo.vn/v2/gateway/api/create", requestBody, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        return res.status(200).json(result.data);
      } catch (error) {
        console.error('Error processing payment:', error);
        return res.status(500).json({ message: "Error processing payment" });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }