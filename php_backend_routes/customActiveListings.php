<?php
header("Content-type:application/json;charset=utf-8");
// Setting Variables from inputs
$seller = $_POST['oracle'];


$userID = $_POST['userID'];
$ts = date("mdYGis");
$fileName = "{$seller}_{$userID}_activeListings_{$ts}.csv";
$csvfile = fopen("reports//{$fileName}", "w");


$sql1 = ''; (SQL Query removed intentionally)

$rs1=odbc_exec($conn,$sql1);if (!$rs1){exit("Error in SQL 1.  Connection has failed to Datawarehouse");}


$headerarray = array("Seller ID","Item ID","Item Title","Custom Label","Initial Qty","Qty Sold","Qty Remaining","Current Price","Active GMV","Listing Type","Item Condition","Best Offer","GSP Enabled","Leaf Categ Name","Meta Categ Name","Categ Lvl 2","Categ Lvl3","Categ Lvl 4","Categ Lvl 5","Categ Lvl 6","Auct Start Date","Last Trxn Date","Days Since Sale","Last Revision Date","Days Since Revision","Days Active","Stated Handle Time","Variations");
fputcsv($csvfile, $headerarray);

while (odbc_fetch_row($rs1))
  {
  $SLR_ID=odbc_result($rs1,"SLR_ID");
  $ITEM_ID=odbc_result($rs1,"ITEM_ID");
  $AUCT_TITL=odbc_result($rs1,"AUCT_TITL");
  $CUSTOM_LABEL=odbc_result($rs1,"CUSTOM_LABEL");
  $INITIAL_QTY=odbc_result($rs1,"INITIAL_QTY");
  $QTY_SOLD=odbc_result($rs1,"QTY_SOLD");
  $QTY_REMAINING=odbc_result($rs1,"QTY_REMAINING");
  $CURNT_PRICE_USD=odbc_result($rs1,"CURNT_PRICE_USD");
  $ACTV_GMV=odbc_result($rs1,"ACTV_GMV");
  $LSTG_TYPE=odbc_result($rs1,"LSTG_TYPE");
  $ITEM_CONDITION=odbc_result($rs1,"ITEM_CONDITION");
  $BEST_OFFER=odbc_result($rs1,"BEST_OFFER");
  $GSP_ENABLED_FLAG=odbc_result($rs1,"GSP_ENABLED_FLAG");
  $LEAF_CATEG_NAME=odbc_result($rs1,"LEAF_CATEG_NAME");
  $META_CATEG_NAME=odbc_result($rs1,"META_CATEG_NAME");
  $CATEG_LVL2_NAME=odbc_result($rs1,"CATEG_LVL2_NAME");
  $CATEG_LVL3_NAME=odbc_result($rs1,"CATEG_LVL3_NAME");
  $CATEG_LVL4_NAME=odbc_result($rs1,"CATEG_LVL4_NAME");
  $CATEG_LVL5_NAME=odbc_result($rs1,"CATEG_LVL5_NAME");
  $CATEG_LVL6_NAME=odbc_result($rs1,"CATEG_LVL6_NAME");  
  $AUCT_START_DT=odbc_result($rs1,"AUCT_START_DT");
  $LAST_TXN_DATE=odbc_result($rs1,"LAST_TXN_DATE");
  $DAYSSINCESALE=odbc_result($rs1,"DAYSSINCESALE");
  $LAST_REV_DATE=odbc_result($rs1,"LAST_REV_DATE");
  $DAYSSINCEREV=odbc_result($rs1,"DAYSSINCEREV");
  $DAYSACTIVE=odbc_result($rs1,"DAYSACTIVE");
  $STD_HNDL_TM=odbc_result($rs1,"STD_HNDL_TM");
  $VARIATIONS=odbc_result($rs1,"VARIATIONS");
 

$rowarray = array($SLR_ID,$ITEM_ID,$AUCT_TITL,$CUSTOM_LABEL,$INITIAL_QTY,$QTY_SOLD,$QTY_REMAINING,$CURNT_PRICE_USD,$ACTV_GMV,$LSTG_TYPE,$ITEM_CONDITION,$BEST_OFFER,$GSP_ENABLED_FLAG,$LEAF_CATEG_NAME,$META_CATEG_NAME,$CATEG_LVL2_NAME,$CATEG_LVL3_NAME,$CATEG_LVL4_NAME,$CATEG_LVL5_NAME,$CATEG_LVL6_NAME,$AUCT_START_DT,$LAST_TXN_DATE,$DAYSSINCESALE,$LAST_REV_DATE,$DAYSSINCEREV,$DAYSACTIVE,$STD_HNDL_TM,$VARIATIONS);


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