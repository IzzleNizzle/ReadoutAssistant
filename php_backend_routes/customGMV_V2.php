<?php

header("Content-type:application/json;charset=utf-8");
// Setting Variables from inputs
$seller = $_POST['oracle'];


$userID = $_POST['userID'];
$ts = date("mdYGis");
$fileName = "{$seller}_{$userID}_gmv_{$ts}.csv";
$csvfile = fopen("reports//{$fileName}", "w");


$sql1 = ''; (SQL Query removed intentionally)

$rs1=odbc_exec($conn,$sql1);if (!$rs1){exit("Error in SQL 1");}

$headerarray = array("USER_ID","CAL_YEAR","RETAIL_WEEK","GMV","ITEM_SOLD_QTY");
fputcsv($csvfile, $headerarray);

while (odbc_fetch_row($rs1))
  {
$USER_ID=odbc_result($rs1,"USER_ID");
$RETAIL_YEAR=odbc_result($rs1,"RETAIL_YEAR");
$RETAIL_WEEK=odbc_result($rs1,"RETAIL_WEEK");
$TOTAL_GMV=odbc_result($rs1,"TOTAL_GMV");
$ITEM_SOLD_QTY=odbc_result($rs1,"ITEM_SOLD_QTY");



$rowarray = array($USER_ID,$RETAIL_YEAR,$RETAIL_WEEK,$TOTAL_GMV,$ITEM_SOLD_QTY);
fputcsv($csvfile, $rowarray);

 }

fclose($csvfile);
odbc_close($conn);

	// Responding with Data
	$data['response'] = 'success';
	$data['content1'] = $fileName;
	$data['conData'] = "dataisGood";
	echo json_encode($data);

?>
