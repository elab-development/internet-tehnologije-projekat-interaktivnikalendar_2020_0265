<?php
    
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\RoleResource;
use App\Http\Resources\RoleCollection;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use DB;
use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;
use App\Models\User;
    
class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    function __construct()
    {

    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

     public function index()
    {
        $roles = Role::all();
        return new RoleCollection($roles);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|unique:roles,name'
        ]);
    
        $role = Role::create(['name' => $request->input('name')]);
    
        return response()->json('Role created successfully');
    }

    public function assignPermission(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'permission' => 'required',
        ]);
    
        $role = Role::findByName($request->name);
         
        $permission = Permission::findByName($request->permission);
        $permissions = $role->permissions()->get();

        if($permissions->firstWhere("name", $request->permission) != null)
        return response()->json('Permission already assigned');
        $role->syncPermissions($permissions->add($permission));

        return response()->json('Permission assigned successfully');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $role = Role::find($id);
        $rolePermissions = Permission::join("role_has_permissions","role_has_permissions.permission_id","=","permissions.id")
            ->where("role_has_permissions.role_id",$id)
            ->get();
        if(is_null($role))
            return response()->json('Data not found', 404);
        return response()->json(
            array_merge(
                json_decode($role, true),
                json_decode($rolePermissions, true)
            )
        );
    }
    
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => 'required'
        ]);
    
        $role = Role::find($id);
        $role->name = $request->input('name');
        $role->save();
    
        return response()->json('Role name changed');
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        DB::table("roles")->where('id',$id)->delete();
        return response()->json('Role deleted');
    }

    public function removePermission(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'permission' => 'required',
        ]);

        if(DB::table("role_has_permissions")->where('permission_id',Permission::findByName($request->permission)->id)
        ->where('role_id',(Role::findByName($request->name))->id) == null){
            return response()->json('Permission is not granted for role');
        }
        DB::table("role_has_permissions")->where('permission_id',Permission::findByName($request->permission)->id)
        ->where('role_id',(Role::findByName($request->name))->id)->delete();
        return response()->json('Permission removed');
    }

    public function assignRole(Request $request){
        $request->validate([
            'username' => 'required',
            'role' => 'required',
        ]);

        (User::get()->where('username', $request->username))->assignRole($request->role);
        return response()->json('Role assigned successfully!');
    }
}