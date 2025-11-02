import { NextResponse } from 'next/server'
import ThermalPrinter from 'node-thermal-printer'

export async function POST(req) {
  try {
    const data = await req.json()

    const printer = new ThermalPrinter({
      type: ThermalPrinter.types.EPSON, // Sesuaikan dengan printer
      interface: 'tcp://192.168.0.100', // Ganti sesuai koneksi printer
    })

    let printContent = `Transaction Detail\n\n`
    printContent += `ID: ${data.transactionId}\n`
    printContent += `Customer Name: ${data.name}\n`
    printContent += `Transaction Type: ${data.transactionType}\n`
    printContent += `Status: ${data.status}\n`
    printContent += `Payment Method: ${data.paymentMethod}\n`
    printContent += `Total Price: Rp${data.totalPrice}\n`
    printContent += `Created At: ${new Date(data.createdAt).toLocaleString()}\n\n`
    printContent += `Items:\n`

    if (data.items && data.items.length > 0) {
      data.items.forEach((item) => {
        printContent += `${item.name} x ${item.quantity} = Rp${item.price * item.quantity}\n`
      })
    } else {
      printContent += `Tidak ada item.\n`
    }

    printer.println(printContent)
    await printer.cut()
    await printer.execute()

    return NextResponse.json({ success: true, message: 'Printed successfully' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, message: 'Failed to print', error: error.message })
  }
}
