<?php

header("Content-type:application/json;charset=utf-8");
// Setting Variables from inputs
$seller = $_POST['oracle'];



$sql1 = ''; (SQL Query removed intentionally)

$rs1=odbc_exec($conn,$sql1);if (!$rs1){exit("Error in SQL 1.  Connection has failed to Datawarehouse");}



// I'm creating two seperate objects from this query. 
// One will be for printing the .csv report that the one pager knows.
// The other one is simply for the response to the client so they know what the three_month_count is

// Setting up array for Data, this includes Three_Month_Count
$dataArray = array(array("USER_ID","MRCHNT_NAME","THREE_MONTH_COUNT", "EVAL_DATE","SELLER_LEVEL","DFCT_RATE","CANCELLATIONS","CASES_CLOSED_WO_RES","LATE_SHIPMENT","OVERALL_TRACKING","GMV","PL_COUNT","EGD_COUNT"));
	
// This loops through the response data and saves it to arrays
while (odbc_fetch_row($rs1))
  {
  $USER_ID=odbc_result($rs1,"USER_ID");
  $MRCHNT_NAME=odbc_result($rs1,"MRCHNT_NAME");
  $THREE_MONTH_COUNT=odbc_result($rs1, "THREE_MONTH_COUNT");
  $EVAL_DATE=odbc_result($rs1,"EVAL_DATE");
  $SELLER_LEVEL=odbc_result($rs1,"SELLER_LEVEL");
  $DFCT_RATE=odbc_result($rs1,"DFCT_RATE");
  $CANCELLATIONS=odbc_result($rs1,"CANCELLATIONS");
  $CASES_CLOSED_WO_RES=odbc_result($rs1,"CASES_CLOSED_WO_RES");
  $LATE_SHIPMENT=odbc_result($rs1,"LATE_SHIPMENT");
  $OVERALL_TRACKING=odbc_result($rs1,"OVERALL_TRACKING");
  $GMV=odbc_result($rs1,"GMV");
  $PL_COUNT=odbc_result($rs1,"PL_COUNT");
  $EGD_COUNT=odbc_result($rs1,"EGD_COUNT");
  
 
// This array is used for printing the .csv file. No Three_month_count included
$rowarray = array($USER_ID,$MRCHNT_NAME,$EVAL_DATE,$SELLER_LEVEL,$DFCT_RATE,$CANCELLATIONS,$CASES_CLOSED_WO_RES,$LATE_SHIPMENT,$OVERALL_TRACKING,$GMV,$PL_COUNT,$EGD_COUNT);

// This line compiles the array used for responding to the client
array_push($dataArray, array($USER_ID,$MRCHNT_NAME,$THREE_MONTH_COUNT,$EVAL_DATE,$SELLER_LEVEL,$DFCT_RATE,$CANCELLATIONS,$CASES_CLOSED_WO_RES,$LATE_SHIPMENT,$OVERALL_TRACKING,$GMV,$PL_COUNT,$EGD_COUNT));

}


// Setting up the file to be saved on the server, including the username of the member from the SQL report

// Timestamp
$ts = date("mdYGis");

// File name formatting
$fileName = "{$seller}_{$MRCHNT_NAME}_dashboard_{$ts}.csv";

// Writing a new .csv file
$csvfile = fopen("reports//{$fileName}", "w");

// Creating a header array for the .csv file
$headerarray = array("USER_ID","MRCHNT_NAME","EVAL_DATE","SELLER_LEVEL","DFCT_RATE","CANCELLATIONS","CASES_CLOSED_WO_RES","LATE_SHIPMENT","OVERALL_TRACKING","GMV","PL_COUNT","EGD_COUNT");

// Adding header data to the .csv file
fputcsv($csvfile, $headerarray);

// Adding the rest of the data to the .csv file
fputcsv($csvfile, $rowarray);

// Finish writing to the .csv file
fclose($csvfile);

// Close SQL Database connection
odbc_close($conn);

// Responding with Data
$data['response'] = 'success';
$data['content1'] = $dataArray;
$data['conData'] = $fileName;
echo json_encode($data);

?>	