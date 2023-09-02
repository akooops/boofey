<?php

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
        array_unshift($visiblePages, '...');
    }
    if ($endPage < $totalPages) {
        $visiblePages[] = '...';
        $visiblePages[] = $totalPages;
    }

    if($visiblePages[0] != 1)
        array_unshift($visiblePages, 1);

    return $visiblePages;
}