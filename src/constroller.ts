import { NextFunction, Request, RequestHandler, Response } from 'express';
import xlsx from 'xlsx';
import multer from 'multer';

export const exportFile: RequestHandler = async (req: Request, res: Response) => {
    try {
        // Reading our test file
        const file = xlsx.readFile('./src/uploads/xlsx-1661417002800.xlsx', { cellDates: true })
        const sheets = file.Sheets["Chứng từ bán hàng"]
        const a: any = Object.values(sheets);
        let b: string[] = []
        for (let i = 1; i < a.length - 1; i++) {
            const c = a[i].v
            b.push(c)
        }
        const data = ""
        const row = [{
            ["Phương thức thanh toán"]: "",
            ["Lập kèm hóa đơn"]: "412",
            ["Ngày hạch toán (*)"]: "2022-08-03",
            ["Ngày chứng từ (*"]: "2022-08-02T16:59:20.000Z",
            ["Ký hiệu HĐ"]: "1C22THD",
            ["Số hóa đơn"]: "00000036",
            ["Ngày hóa đơn"]: "2022-08-04T16:59:20.000Z",
            ["Mã khách hàng"]: "05-00008123",
            ["Tên khách hàng"]: "CÔNG TY CỔ PHẦN XÂY DỰNG KIẾN TRÚC AA TÂY NINH",
            ["Địa chỉ"]: "Tổ 1, ấp Bùng Binh, Xã Hưng Thuận, Thị Xã Trảng Bàng, Tỉnh Tây Ninh, Việt Nam",
            ["Mã số thuế"]: "3901266138",
            ["Diễn giải"]: "Tiền điện từ 01/07/2022 đến\n 31/07/2022; \nMã KH: SC0003;\nID1: 30790061\nID2: 30790355",
            ["Mã hàng (*)"]: "RSEDD",
            ["TK Tiền/Chi phí/Nợ (*)"]: "1311",
            ["TK Doanh thu/Có (*)"]: "511301"
        }]

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(row);
        xlsx.utils.book_append_sheet(wb, ws, Date.now() + '.xlsx');
        const g = xlsx.utils.sheet_add_aoa(ws, [b], { origin: "A1" });
        await xlsx.writeFile(wb, `./src/uploads/${Date.now()}.xlsx`)
        res.send("export file thanh cong")
    } catch (err) {
        throw err
    }
}

export const importFile: RequestHandler = async (req: Request, res: Response) => {
    try {
        const file = req.file
        if (!file || file.mimetype != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            const error = new Error('Please upload a file')
            res.send("file khong dung")
        }
        res.send(file)

    } catch (err) {
        throw err
    }
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.xlsx')
    }
})

export const upload = multer({ storage: storage })