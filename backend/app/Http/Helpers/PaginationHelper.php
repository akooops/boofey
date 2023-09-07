<?php
function handlePagination($data) {
    $pagination = [
        'per_page' => $data->perPage(),
        'current_page' => $data->currentPage(),
        'last_page' => $data->lastPage(),
        'from' => ($data->firstItem() == null) ? 0 : $data->firstItem(),
        'to' => ($data->lastItem() == null) ? 0 : $data->lastItem(),
        'total' => $data->total(),
        'pages' => pages($data->currentPage(), $data->lastPage()),
    ];

    return $pagination;
}

function limitPerPage($value){
    return max(1, min(250, $value));
}

function checkPageIfNull($value){
    return ($value === null || !is_numeric($value)) ? 1 : $value;
}

function pages($currentPage, $totalPages){
    $maxVisiblePages = 5; 

    $startPage = max($currentPage - floor($maxVisiblePages / 2), 1);
    $endPage = min($startPage + $maxVisiblePages - 1, $totalPages);

    if ($endPage - $startPage + 1 < $maxVisiblePages) {
        $startPage = max($endPage - $maxVisiblePages + 1, 1);
    }

    $visiblePages = range($startPage, $endPage);

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