<?php
header("Content-type:application/json;charset=utf-8");
// Setting Variables from inputs
$seller = $_POST['oracle'];
$from = $_POST['from'];
$to = $_POST['to'];


$userID = $_POST['userID'];
$ts = date("mdYGis");
$fileName = "{$seller}_{$userID}_soldItems_{$ts}.csv";
$csvfile = fopen("reports//{$fileName}", "w");


$sql = ''; (SQL Query removed intentionally)

$rs=odbc_exec($conn,$sql);
if (!$rs)
  {exit("Error in SQL");}

$headerarray = array("SELLER ID","SELLER","BUYER","BUYER STATE","BUYER COUNTRY","PICKUP_STORE_ID","TRANSACTION ID","ITEM ID","ITEM TITLE","BUYING TOOL","CUSTOM LABEL","L2CATEGORY","L3CATEGORY","L4CATEGORY","L5CATEGORY",
"AUCTION TYPE","START PRICE USD","QUANTITY","SHIP COST","TOTAL PAID AMT","IS_EGD","TRANSACTION DATE","PAID DATE","SHIPPED DATE","SCAN_OR_MAS_DATE","SPECIFIED NUM HANDLY DAYS","MINIMUM EDD","MAX EDD","TRACKING UPLOAD DATE",
"TRACKING NUMBER","TRACKING CARRIER","DELIVERY DATE","DELIVERY TIME","COLOR","SIZE","GMV");
fputcsv($csvfile, $headerarray);

while (odbc_fetch_row($rs))
  {
  $SELLER_ID=odbc_result($rs,"SELLER_ID");
  $SELLER=odbc_result($rs,"SELLER");
  $BUYER=odbc_result($rs,"BUYER");
  $BUYER_STATE=odbc_result($rs,"BUYER_STATE");
  $BUYER_COUNTRY=odbc_result($rs,"BUYER_COUNTRY");
  $PICKUP_STORE_ID=odbc_result($rs,"PICKUP_STORE_ID");
  $TRANSACTION_ID=odbc_result($rs,"TRANSACTION_ID");
  $ITEM_ID=odbc_result($rs,"ITEM_ID");
  $ITEM_TITLE =odbc_result($rs,"ITEM_TITLE");
  $BUYING_TOOL =odbc_result($rs,"BUYING_TOOL");
  $CUSTOM_LABEL =odbc_result($rs,"CUSTOM_LABEL");
  $L2CATEGORY=odbc_result($rs,"L2CATEGORY");
  $L3CATEGORY=odbc_result($rs,"L3CATEGORY");
  $L4CATEGORY=odbc_result($rs,"L4CATEGORY");
  $L5CATEGORY=odbc_result($rs,"L5CATEGORY");  
  $AUCTION_TYPE=odbc_result($rs,"AUCTION_TYPE");
  $START_PRICE_USD=odbc_result($rs,"START_PRICE_USD");
  $TRANS_QTY=odbc_result($rs,"TRANS_QTY");
  $SHIP_COST=odbc_result($rs,"SHIP_COST");
  $TOTAL_PAID_AMT=odbc_result($rs,"TOTAL_PAID_AMT");
  $IS_EGD=odbc_result($rs,"IS_EGD");
  $TRANSACTION_DATE=odbc_result($rs,"TRANSACTION_DATE");  
  $PAID_DATE=odbc_result($rs,"PAID_DATE");
  $SHIPPED_DATE=odbc_result($rs,"SHIPPED_DATE");
  $SCAN_OR_MAS_DATE=odbc_result($rs,"SCAN_OR_MAS_DATE");
  $SPCFD_HNDLNG_DAY_NUM=odbc_result($rs,"SPCFD_HNDLNG_DAY_NUM");
  $MIN_EDD=odbc_result($rs,"MIN_EDD");  
  $MAX_EDD=odbc_result($rs,"MAX_EDD");  
  $TRACKING_UPLOAD_DATE=odbc_result($rs,"TRACKING_UPLOAD_DATE");
  $TRACKING_NUM=odbc_result($rs,"TRACKING_NUM");
  $TRKING_OTHER_CARRIER_NAME=odbc_result($rs,"TRKING_OTHER_CARRIER_NAME");
  $DELIVERY_DATE=odbc_result($rs,"DELIVERY_DATE");
  $DELIVERY_TIME=odbc_result($rs,"DELIVERY_TIME");
  $COLOR=odbc_result($rs,"COLOR");
  $SIZE=odbc_result($rs,"SIZE");  
  $GMV=odbc_result($rs,"GMV");

$rowarray = array($SELLER_ID,$SELLER,$BUYER,$BUYER_STATE,$BUYER_COUNTRY,$PICKUP_STORE_ID,$TRANSACTION_ID,$ITEM_ID,$ITEM_TITLE,$BUYING_TOOL,$CUSTOM_LABEL,$L2CATEGORY,$L3CATEGORY,$L4CATEGORY,$L5CATEGORY,$AUCTION_TYPE,$START_PRICE_USD,
$TRANS_QTY,$SHIP_COST,$TOTAL_PAID_AMT,$IS_EGD,$TRANSACTION_DATE,$PAID_DATE,$SHIPPED_DATE,$SCAN_OR_MAS_DATE,$SPCFD_HNDLNG_DAY_NUM,$MIN_EDD,$MAX_EDD,$TRACKING_UPLOAD_DATE,$TRACKING_NUM,$TRKING_OTHER_CARRIER_NAME,$DELIVERY_DATE,
$DELIVERY_TIME,$COLOR,$SIZE,$GMV);
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