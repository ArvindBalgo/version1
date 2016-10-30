<?php
include_once 'include_all.php';

$mode = $_GET['mode'];

if ($mode == 0){
//delete function to delete a category
    $id = $_GET["id"];

    $modelmetier_category = new modelmetier_category();
    $modelmetier_category = $modelmetier_category->deleteByCategory($id);

    $modelmetier = new modelmetier();
    $modelmetier = $modelmetier->delete($id);
    print "done";
}
else if($mode == 1) {
    $id = $_GET["id"];

    $modelmetier_category = new modelmetier_category();
    $modelmetier_category = $modelmetier_category->delete($id);
    print "done";
}
else if ($mode == 2) {
    $id = $_GET["id"];
    $metier  = new listmetier();
    $metier->delete($id);
    print "done";
}