<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Order extends Model
{
    use HasFactory;

    protected $appends = ["discountCalculated", 'taxCalculated'];

    protected $fillable = [
        'ref',
        'tax',
        'discount',
        'subtotal',
        'total',
    ];

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class, 'order_id', 'id');
    }

    public function getDiscountCalculatedAttribute(){
        return number_format($this->subtotal * ($this->discount / 100), 2);
    }

    public function getTaxCalculatedAttribute(){
        $total = $this->subtotal - $this->subtotal * ($this->discount / 100);

        return number_format($total * ($this->tax / 100), 2);
    }

    /* Methods
        --------------------------------------------------------------------
    */

    protected static function booted()
    {
        parent::booted();

        static::creating(function ($order) {
            $prefix = 'BO';
            $ref = null;

            do {
                $datePart = Carbon::now()->format('dmy');
                $randomPart = strtoupper(Str::random(6));
                $ref = "{$prefix}-{$datePart}{$randomPart}";

            } while (Order::where('ref', $ref)->exists());

            $order->ref = $ref;
        });
    }

    public function calculateTotal(){
        $total = $this->subtotal - $this->subtotal * ($this->discount / 100);
        $total = $total + $total * ($this->tax / 100);

        $this->total = $total;
    }
    public function saveOrderItems($products){
        OrderItem::where('order_id', $this->id)->delete();

        foreach($products as $product){
            $productRecord = Product::find($product["id"]);

            if($productRecord === null) continue;

            $orderItem = OrderItem::create([
                'order_id' => $this->id,
                'product_id' => $product["id"],
                'qty' => abs($product["qty"]),
                'price' => $productRecord->currentPrice
            ]);

            $orderItem->save();

            $this->subtotal += $productRecord->currentPrice * $orderItem->qty;
        }
    }
}
