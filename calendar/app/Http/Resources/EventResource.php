<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EventResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

     public static $wrap = 'event';
    public function toArray(Request $request): array
    {
        //return parent::toArray($request);
        return[
            'id'=>$this->resource->id,
            'name'=>$this->resource->name,
            'start'=>$this->resource->start,
            'end'=>$this->resource->end,
            'category'=>new CategoryResource($this->resource->category),
            'user'=>new UserResource(User::find($this->resource->user_id))
        ];
    }
}
