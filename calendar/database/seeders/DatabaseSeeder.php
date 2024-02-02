<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Notification;
use App\Models\Category;
use App\Models\Event;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Notification::truncate();
        Category::truncate();
        Event::truncate();
        User::truncate();

        $user1 = User::factory()->create();
        $user2 = User::factory()->create();

        $cat1 = Category::factory()->create();
        $cat2 = Category::factory()->create();
        $cat3 = Category::factory()->create();

        Event::factory(3)->create([
            'user_id'=>$user1->id,
            'category_id'=>$cat1->id
        ]);

        $event1 = Event::factory()->create([
            'user_id'=>$user2->id,
            'category_id'=>$cat2->id
        ]);

        $event2 = Event::factory()->create([
            'user_id'=>$user2->id,
            'category_id'=>$cat3->id
        ]);

        Notification::factory()->create([
            'event_id'=>$event1->id
        ]);

        Notification::factory()->create([
            'event_id'=>$event2->id
        ]);

        //$seeder = new UserRolesSeeder();
        //$seeder->run();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
