export interface API_ERROR_RESPONSE {
  code: string | null;
  error: string | null;
}

export const FAQ = [
  {
    title: "Python version อะไร",
    desc: "Python 3.12.0",
  },
  {
    title: "ถ้านักศึกษามีการย้ายกลุ่ม ต้องทำอย่างไร",
    desc: "ให้แจ้งอาจารย์ผู้สอน ว่าย้ายมาจากกลุ่มไหน",
  },
  {
    title: "ส่งแลปได้กี่ครั้ง",
    desc: " ส่งได้ไม่จำกัดจำนวนครั้ง จนกว่าจะได้คะแนนเต็ม",
  },
  {
    title: "ทำไมส่งแลปได้คะแนนเต็มแล้ว เข้าไปอีกครั้ง คะแนนเปลี่ยนไป",
    desc: "เนื่องจากระบบจะทำการตรวจใหม่ทุกครั้งเมื่อ กดเข้าไปดูรายละเอียด ถ้าโจทย์ หรือ testcase มีการเปลี่ยนแปลงก็จะทำให้ คะแนนที่ได้เปลี่ยนไปด้วย",
  },
  {
    title: "ลืมรหัสผ่านต้องทำอย่างไร",
    desc: "ให้แจ้งอาจารย์ เพื่อรีเซตรหัสผ่าน",
  },
  {
    title: "Hidden test case คืออะไร",
    desc: "เป็น testcase ที่ไม่แสดงผลลัพธ์ออกทางหน้าจอ ที่ตั้งใจปิดไว้ ถ้าไม่ผ่าน ให้กลับไปอ่านโจทย์ คิดวิเคราะห์ ให้ถี่ถ้วน",
  },
  {
    title: "ถ้าผิดที่ hidden testcase ต้องทำอย่างไร",
    desc: "ให้กลับไปอ่านโจทย์อีกครั้ง ให้ละเอียด ถ้าไม่เข้าใจให้ปรึกษาอาจารย์ผู้สอน",
  },
  {
    title: "ใช้คำสั่งนอกเหนือจากที่เรียน ได้ไหม",
    desc: " โจทย์ทุกข้อ ไม่มีความจำเป็นต้องใช้คำสั่ง นอกเหนือจากที่เรียน หรือที่ระบุไว้ในโจทย์ ไม่แนะนำให้ใช้คำสั่งนอกเหนือจากที่เรียน",
  },
  {
    title: "ทำไมถึงห้ามใช้ import",
    desc: "1. import ยังไม่มีความจำเป็นต้องใช้สำหรับการใช้งานพื่นฐาน 2. การใช้ import จะทำให้บทเรียนมีความซับซ้อนมากขึ้น 3. การใช้งาน import ถ้าใช้โดยไม่เข้าใจ จะทำให้ผิดกฎหมายได้",
  },
  {
    title: "output ของ test case ยาวได้ขนาดเท่าไร",
    desc: "จำนวน byte ของ output ยาวได้ไม่เกิน 1 MB",
  },
  {
    title: "ทำไม ไม่มี testcase แสดงออกมา",
    desc: "ให้ตรวจสอบการรับอินพุท จำนวน input ต้องเป็นไปตามที่โจทย์กำหนด",
  },
  {
    title: "ต้องการ submit ไฟล์ใหม่ หลังจากได้คะแนนเต็มแล้ว ทำได้ไหม",
    desc: "ทำได้โดยแจ้ง อาจารย์ให้ทราบ พร้อมทั้งบอกเหตุผล",
  },
  {
    title: "ทดสอบได้ ในเครื่องตนเอง แต่ส่งไม่ผ่าน",
    desc: "ให้ตรวจสอบ version ของ python ตรวจสอบ ตัวอักษร ใหญ่ เล็ก ตรวจสอบ ช่องว่างระหว่างตัวอักษร",
  },
];
export const INSTRUCTIONS = [
  {
    desc: "เว็บไซต์นี้ถูกออกแบบมาเพื่อให้นักศึกษา ชั้นปีที่ 1 วิชา 01006012 Computer Programming, KMITL",
  },
  { desc: "เพื่อการแสดงผลที่ดี แนะนำให้ใช้ Google Chrome หรือ Firefox" },
  { desc: "Browser ที่ไม่แนะนำให้ใช้ Internet Explorer" },
  {
    desc: "นักศึกษาต้องเขียนโปรแกรมในเครื่องตัวเอง แล้วอัพโหลด Source code (filename.py) เข้าไปในระบบ",
  },
  { desc: "หลังจากใช้งานเสร็จให้ Log out ออกจากระบบ" },
  {
    desc: "การเข้าระบบครั้งแรก ให้ใช้ รหัสนักศึกษาซึ่งเป็นตัวเลขจำนวน 8 ตัว ทั้ง username และ password",
  },
  {
    desc: "ในการ Login ครั้งแรก หลังจาก Log in แล้ว ให้เปลี่ยน password และแก้ไขเพิ่มเติมข้อมูลให้ครบถ้วน รวมถึงอัพโหลดรูปภาพที่เห็นหน้าได้ชัด ไม่ใส่หน้ากาก",
  },
  { desc: "ถ้านักศึกษา Login ไม่ได้ ให้แจ้งอาจารย์เพื่อ Reset password" },
  {
    desc: "ให้นักศึกษาตรวจสอบว่า กลุ่มที่ ถูกต้องหรือไม่ (อยู่หน้า Home) ถ้าไม่ถูกต้องให้แจ้งอาจารย์",
  },
  { desc: "แต่ละบท (Chapter) จะมีแบบฝึกหัด 5 ข้อ (Item) ข้อละ 2 คะแนน" },
  {
    desc: "สามารถส่งได้ไม่จำกัดจำนวนครั้ง จนกว่าจะถูก ทั้งนี้เพื่อให้นักศึกษาได้ฝึกฝนด้วยตนเอง",
  },
  {
    desc: "ถ้าส่งแล้วไม่ได้คะแนน อาจเป็น 0 หรือ -1 ก็ได้ แต่เมื่อส่งผ่านจะได้ 2 คะแนนต่อข้อ",
  },
  {
    desc: "นักศึกษาไม่สามารถ Log in จากคอมพิวเตอร์ 2 เครื่องได้ในเวลาเดียวกัน",
  },
  {
    desc: "Source code ที่ส่ง จะถูกใส่ Timestamp ไว้ที่ส่วนต้นของไฟล์ ซึ่งไม่มีผลต่อการทำงาน",
  },
  {
    desc: "คำสั่งที่ไม่มีในบทเรียน ไม่แนะนำให้ใช้ ถ้าใช้นักศึกษาจะต้องรับความเสี่ยงกรณีที่ตรวจแล้วไม่ได้คะแนน",
  },
  {
    desc: "หลังจากส่ง Source code แล้วไม่ผ่าน Test case จะมีการแสดงผลถึงตัวแรกที่ไม่ผ่าน",
  },
  { desc: "Test case ที่ไม่แสดงผลอินพุท เรียกว่า Hidden test case" },
  { desc: "อาจารย์สามารถเปิดหรือปิดแล็บเมื่อไหร่ก็ได้" },
  { desc: "เมื่อเรียนบทเรียนแล้ว ควรทำแล็บให้เสร็จโดยเร็ว" },
  { desc: "แล็บแต่ละ Chapter จะเปิดเป็นเวลาประมาณ 7 วัน" },
  { desc: "Source code ที่ส่ง ห้ามมีคำว่า import" },
];

export const EXAMINATION = [
  { desc: "นำบัตรนักศึกษา หรือบัตรประชาชน ดินสอ ปากกามาด้วย" },
  { desc: "นักศึกษาต้องมาทำการสอบ ที่ ภาควิชาวิศวกรรมคอมพิวเตอร์" },
  { desc: "เป็นการสอบแบบ Closed book" },
  { desc: "นักศึกษาจะไม่สามารถเข้าดูประวัติการส่งงานได้" },
  { desc: "เว็บไซต์นี้จะไม่สามารถเข้าถึงได้จากเครือข่ายคอมพิวเตอร์นอกสถาบัน" },
  {
    desc: "เครื่องคอมพิวเตอร์จะตั้งค่าให้เข้าได้ เว็บไซต์เดียวเท่านั้น จะเข้าเว็บไซต์อื่น ๆ ไม่ได้",
  },
  {
    desc: "เมื่อเข้าห้องแล้ว ให้ทดสอบเครื่องคอมพิวเตอร์ ถ้าพบอุปกรณ์ไม่ดี ให้แจ้งผู้ดูแล",
  },
  {
    desc: "ให้ทดสอบ IDE (Vs code) ที่ใช้ โดยทดลองเขียนโปรแกรม helloworld ถ้าไม่ได้ให้แจ้งผู้ดูแล ก่อนเริ่มสอบ",
  },
  { desc: "Save file ที่ไดร์ฟ D หรือ E" },
  { desc: "ถ้ามีการรีสตาร์ท ข้อมูลที่บันทึกไว้จะสูญหาย" },
  { desc: "ห้ามนำเอกสารเข้าห้องสอบ" },
  {
    desc: "ห้ามพกอุปกรณ์อิเลกทรอนิกส์ติดตัว ให้ปิดเครื่อง และนำไปวางในที่ปลอดภัย",
  },
  { desc: "ถ้าพบว่าทำการทุจริต จะลงโทษ ตามระเบียบของทางคณะวิศวกรรมศาสตร์" },
  { desc: "ให้เซนต์ชื่อก่อนสอบ และหลังสอบ" },
];

export const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const TESTCASE_STATUS = {
  noInput: "NO_INPUT",
  yes: "YES",
  undefined: "UNDEFINED",
};

export const ALLOW_PROBLEM_TYPE = {
  always: "ALWAYS",
  deny: "DENY",
  timmer : "TIMER",
  timerPaused : "TIMER_PASUED",
  dateTime : "DATETIME"
};

export const SUBMISSION_STATUS = {
  wrongAnswer: "WRONG_ANSWER",
  accepted: "ACCEPTED",
  error: "ERROR",
  pending: "PENDING",
  rejected: "REJECTED",
};
