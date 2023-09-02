<?php

function limitPerPage($value){
    if ($value < 1) {
        return 1;
    } elseif ($value > 250) {
        return 250;
    }

    return $value;
}

function pages($currentPage, $totalPages){
    $maxVisiblePages = 5; // Adjust the number of visible page numbers as needed

    // Calculate the start and end of the visible page numbers
    $startPage = max($currentPage - floor($maxVisiblePages / 2), 1);
    $endPage = min($startPage + $maxVisiblePages - 1, $totalPages);

    // Ensure that there are at least $maxVisiblePages pages shown
    if ($endPage - $startPage + 1 < $maxVisiblePages) {
        $startPage = max($endPage - $maxVisiblePages + 1, 1);
    }

    // Create an array of visible page numbers
    $visiblePages = range($startPage, $endPage);

    // Add ellipsis if there are more pages before or after the visible pages
    if ($startPage > 1) {
        if($visiblePages[0] != 2)
            array_unshift($visiblePages, 2);
    }
    if ($endPage < $totalPages) {
        $visiblePages[] = $totalPages - 1;
        $visiblePages[] = $totalPages;
    }

    if($visiblePages[0] != 1){
        array_unshift($visiblePages, 1);
    }

    return $visiblePages;
}