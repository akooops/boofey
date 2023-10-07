<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $appends = ["discountCalculated", 'taxCalculated'];

    protected $fillable = [
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
        return $this->subtotal * ($this->discount / 100);
    }

    public function getTaxCalculatedAttribute(){
        $total = $this->subtotal - $this->subtotal * ($this->discount / 100);

        return $total * ($this->tax / 100);
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
