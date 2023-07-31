import * as XLSX from 'XLSX';
/**
 * 从 excel 文件读取数据
 * @param excelFile excel 文件
 */
export async function importExcelFromFile<T>(
    excelFile: File
): Promise<T[]> {
    const arrayBuffer = await excelFile.arrayBuffer();

    const workbook: XLSX.WorkBook = XLSX.read(arrayBuffer, { type: 'buffer' });

    const sheetNames = workbook.SheetNames;
    const sheet = workbook.Sheets[sheetNames[0]];

    const json = XLSX.utils.sheet_to_json(sheet);

    return json as T[];
}

/**
 * 导出 excel 文件
 * @param array JSON 数组
 * @param sheetName 第一张表名
 * @param fileName 文件名
 */
export function exportExcelFile(array: any[], sheetName = '表1', fileName = 'example.XLSX') {
    const jsonWorkSheet = XLSX.utils.json_to_sheet(array);
    const workBook: XLSX.WorkBook = {
        SheetNames: [sheetName],
        Sheets: {
            [sheetName]: jsonWorkSheet,
        }
    };
    return XLSX.writeFile(workBook, fileName);
}
