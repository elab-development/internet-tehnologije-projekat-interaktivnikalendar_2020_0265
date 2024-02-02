<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class UserRolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            'role-list',
            'role-create',
            'role-edit',
            'role-delete',
            'category-list',
            'category-create',
            'category-edit',
            'category-delete',
            'user-delete'
         ];
         foreach ($permissions as $permission) {
              Permission::create(['name' => $permission, 'guard_name' => 'web']);
         }

        $role1 = Role::create(['name' => 'admin', 'guard_name' => 'web']);
        $role2 = Role::create(['name' => 'moderator', 'guard_name' => 'web']);
        $role3 = Role::create(['name' => 'editor', 'guard_name' => 'web']);
        $role4 = Role::create(['name' => 'helper', 'guard_name' => 'web']);

        $role1->syncPermissions($permissions);
        $role2->syncPermissions(['role-list','role-create','role-edit','category-list','category-create','category-edit']);
        $role3->syncPermissions(['role-list','role-edit','category-list','category-edit']);
        $role4->syncPermissions(['role-list','category-list']);

        $user = User::create([
            'username'=>'Admin',
            'email'=>'admin@admin.com',
            'password'=>'password'
        ]);

        $user->assignRole($role1);
    }
}
