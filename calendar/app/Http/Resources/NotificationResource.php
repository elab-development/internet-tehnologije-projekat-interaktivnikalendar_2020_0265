<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NotificationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
     public static $wrap = 'notification';
    public function toArray(Request $request): array
    {
        return [
            'id'=> $this->resource->id,
            'title'=> $this->resource->title,
            'description'=> $this->resource->description,
            'slug'=> $this->resource->slug,
            'hoursBefore'=> $this->resource->hoursBefore,
            'event_id'=> new EventResource($this->resource->event)
        ];
    }
}
