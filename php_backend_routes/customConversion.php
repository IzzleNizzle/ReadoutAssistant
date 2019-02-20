<?php

header("Content-type:application/json;charset=utf-8");
// Setting Variables from inputs
$seller = $_POST['oracle'];


$userID = $_POST['userID'];
$ts = date("mdYGis");
$fileName = "{$seller}_{$userID}_conversion_{$ts}.csv";
$csvfile = fopen("reports//{$fileName}", "w");


$sql1 = ''; (SQL Query removed intentionally)

$rs1=odbc_exec($conn,$sql1);if (!$rs1){exit("Error in SQL 1.  Connection has failed to Datawarehouse");}


$headerarray = array("Item_Number","Title","Lifetime Sales","Meta Category","L2 Category","L3 Category","L4 Category","Impressions","Views From Impressions","All Views","Sales");
fputcsv($csvfile, $headerarray);

while (odbc_fetch_row($rs1))
  {
$ITEM_ID=odbc_result($rs1,"ITEM_ID");
$AUCT_TITL=odbc_result($rs1,"AUCT_TITL");
$QTY_SOLD=odbc_result($rs1,"QTY_SOLD");
$META_CATEG=odbc_result($rs1,"META_CATEG");
$CATEG_LVL2=odbc_result($rs1,"CATEG_LVL2");
$CATEG_LVL3=odbc_result($rs1,"CATEG_LVL3");
$CATEG_LVL4=odbc_result($rs1,"CATEG_LVL4");
$IMPRESSIONS=odbc_result($rs1,"IMPRESSIONS");
$IMPR_VIEWS=odbc_result($rs1,"IMPR_VIEWS");
$VIEWS=odbc_result($rs1,"VIEWS");
$SALES=odbc_result($rs1,"SALES");


 $rowarray = array($ITEM_ID,$AUCT_TITL,$QTY_SOLD,$META_CATEG,$CATEG_LVL2,$CATEG_LVL3,$CATEG_LVL4,$IMPRESSIONS,$IMPR_VIEWS,$VIEWS,$SALES);


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
