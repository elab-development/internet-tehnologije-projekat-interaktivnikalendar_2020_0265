<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startDate = Carbon::today()->subDays(rand(0, 365));
        $endDate = clone $startDate;
        $endDate->addHours($this->faker->numberBetween(1,24));
        return [
            'name'=> $this->faker->word(),
            'slug'=> $this->faker->slug(),
            'start'=> $startDate,
            'end'=> $endDate,
            'user_id'=>User::factory(),
            'category_id'=>Category::factory()
        ];
    }
}
