/**
 * Demo - Generate PDF report from a Google Sheet
 * This script reads data from a sheet and exports a simple PDF summary.
 */

function generatePdfReport() {
  var spreadsheetId = "PUT_SPREADSHEET_ID_HERE";
  var sheetName = "Data";
  
  var ss = SpreadsheetApp.openById(spreadsheetId);
  var sheet = ss.getSheetByName(sheetName);
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();

  // Read data range
  var dataRange = sheet.getRange(1, 1, lastRow, lastColumn);
  var data = dataRange.getValues();

  // Create temporary document
  var doc = DocumentApp.create("Demo Automation Report");
  var body = doc.getBody();
  body.appendParagraph("Demo Automation Report").setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph("Generated at: " + new Date());

  body.appendParagraph("\nRows in sheet: " + lastRow);
  body.appendParagraph("Columns in sheet: " + lastColumn);
  body.appendParagraph("\nFirst data row:");
  body.appendParagraph(JSON.stringify(data[1]));

  doc.saveAndClose();

  // Export as PDF
  var pdfBlob = DriveApp.getFileById(doc.getId()).getAs("application/pdf");
  var folder = DriveApp.getRootFolder();
  var pdfFile = folder.createFile(pdfBlob).setName("demo_automation_report.pdf");

  Logger.log("PDF created: " + pdfFile.getUrl());
}
