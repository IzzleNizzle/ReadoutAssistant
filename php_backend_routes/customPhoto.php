<?php

header("Content-type:application/json;charset=utf-8");
// Setting Variables from inputs
$seller = $_POST['oracle'];



$userID = $_POST['userID'];
$ts = date("mdYGis");
$fileName = "{$seller}_{$userID}_photo_{$ts}.csv";
$csvfile = fopen("reports//{$fileName}", "w");



$sql1 = ''; (SQL Query removed intentionally)

$rs1=odbc_exec($conn,$sql1);if (!$rs1){exit("Error in SQL 1.  Connection has failed to Datawarehouse");}


$headerarray = array("Item Number","Title","Qty","Photo Count","Photos Shown","Gallery",'Full Category');
fputcsv($csvfile, $headerarray);

while (odbc_fetch_row($rs1))
  {
  $ITEM_ID=odbc_result($rs1,"ITEM_ID");
  $AUCT_TITL=odbc_result($rs1,"AUCT_TITL");
  $QTY_AVAIL=odbc_result($rs1,"QTY_AVAIL");
  $PHOTO_COUNT=odbc_result($rs1,"PHOTO_COUNT");
  $PHOTOS_SHOWN=odbc_result($rs1,"PHOTOS_SHOWN");
  $GLRY_STATUS=odbc_result($rs1,"GLRY_STATUS");
  $CURR_CATEG_TRAIL=odbc_result($rs1,"CURR_CATEG_TRAIL");
 

$rowarray = array($ITEM_ID,$AUCT_TITL,$QTY_AVAIL,$PHOTO_COUNT,$PHOTOS_SHOWN,$GLRY_STATUS,$CURR_CATEG_TRAIL);


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