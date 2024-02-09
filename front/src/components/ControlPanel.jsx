import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ControlPanel = () => {
  const [selectedUser, setSelectedUser] = useState();
  const [selectedRole, setSelectedRole] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [users, setUsers] = useState();
  const [roles, setRoles] = useState();
  const [categories, setCategories] = useState();
  const [roleName, setRoleName] = useState('');
  const [selectedPermission, setSelectedPermission] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [categorySlug, setCategorySlug] = useState('');
  const [selectedUsername, setSelectedUsername] = useState();
  const [selectedRoleName, setSelectedRoleName] = useState('');
  const [selectedUserRole, setSelectedUserRole] = useState();
  
  const axiosInstance = axios.create({
    headers: {
      'Authorization': 'Bearer '+ window.sessionStorage.getItem("auth_token"),
    }
  });

  const handleUserChange = (event) => {
    
    setSelectedUser(event.target.value);
    setSelectedUsername(event.target.options[event.target.selectedIndex].text);
    if(event.target.value){
    axiosInstance.get(`api/users/${event.target.value}/role`).then((res) => {
        console.log(res.data);
        setSelectedUserRole(res.data.name);
    })
}
else
setSelectedUserRole("has no Role");
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
    setSelectedRoleName(event.target.options[event.target.selectedIndex].text);
    axiosInstance.get(`api/roles/${event.target.value}`).then((res) => {
        console.log(res.data);
    })
  };
  
  const handlePermissionChange = (event) => {
    setSelectedPermission(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform action based on selected combobox value
    console.log('Submitted!');
  };

  const handleSubmitRole = (event) => {
    event.preventDefault();
    axiosInstance.post("api/roles", {name:roleName
      }).then((res)=>{console.log(res.data);
        }).catch((e)=>{
          console.log(e);
        });
        axiosInstance.get("api/roles").then((res) => {
            const updatedRoles = res.data.roles.map(role => ({
              id: role.id,
              name: role.name
            }));
    
          console.log('Updated Roles:', updatedRoles);
          setRoles(updatedRoles);
          
        });
        
  };


  const handleRoleUpdate = (event) => {
    event.preventDefault();
    axiosInstance.put(`api/roles/${selectedRole}`, {name:roleName
      }).then((res)=>{console.log(res.data);
        }).catch((e)=>{
          console.log(e);
        });
        axiosInstance.get("api/roles").then((res) => {
            const updatedRoles = res.data.roles.map(role => ({
              id: role.id,
              name: role.name
            }));
    
          console.log('Updated Roles:', updatedRoles);
          setRoles(updatedRoles);
          
        });
        
  };

  const handleRoleAddPermission = (event) => {
    event.preventDefault();
    axiosInstance.post(`api/roles/assign-permission`, {name:selectedRoleName, permission:selectedPermission
      }).then((res)=>{console.log(res.data);
        }).catch((e)=>{
          console.log(e);
        });
        
  };

  const handleRoleRemovePermission = (event) => {
    event.preventDefault();
    axiosInstance.post("api/roles/remove-permission", {name:selectedRoleName, permission:selectedPermission
      }).then((res)=>{console.log(res.data);
        }).catch((e)=>{
          console.log(e);
        });
        
  };

  const handleRoleDelete = (event) => {
    event.preventDefault();
    axiosInstance.delete(`api/roles/${selectedRole}`
      ).then((res)=>{console.log(res.data);
        }).catch((e)=>{
          console.log(e);
        });
        axiosInstance.get("api/roles").then((res) => {
            const updatedRoles = res.data.roles.map(role => ({
              id: role.id,
              name: role.name
            }));
    
          console.log('Updated Roles:', updatedRoles);
          setRoles(updatedRoles);
          
        });
  };

  const handleRoleAssign = (event) => {
    event.preventDefault();
    axiosInstance.post("api/roles/assign", {username:selectedUsername, role:selectedRoleName
      }).then((res)=>{console.log(res.data);
        setSelectedUserRole(selectedRoleName);
        }).catch((e)=>{
          console.log(e);
        });
  };

  const handleRoleReplace = (event) => {
    event.preventDefault();
    axiosInstance.post("api/users/role", {user_id:selectedUser, role_id:selectedRole
      }).then((res)=>{console.log(res.data);
        setSelectedUserRole(selectedRoleName);
        }).catch((e)=>{
          console.log(e);
        });
  };

  const handleSubmitCategory = (event) => {
    event.preventDefault();
    axiosInstance.post("api/categories", {name:categoryName, slug: categorySlug
      }).then((res)=>{console.log(res.data);
        }).catch((e)=>{
          console.log(e);
        });
        axiosInstance.get("api/categories").then((res) => {
            const updatedCategories = res.data.categories.map(category => ({
              id: category.id,
              name: category.name,
              slug: category.slug
            }));
    
          console.log('Updated Categories:', updatedCategories);
          setCategories(updatedCategories);
          
        });
        
  };

  const handleCategoryUpdate = (event) => {
    event.preventDefault();
    axiosInstance.put(`api/categories/${selectedCategory}`, {name:categoryName, slug: categorySlug
      }).then((res)=>{console.log(res.data);
        }).catch((e)=>{
          console.log(e);
        });
        axiosInstance.get("api/categories").then((res) => {
            const updatedCategories = res.data.categories.map(category => ({
              id: category.id,
              name: category.name,
              slug: category.slug
            }));
    
          console.log('Updated Categories:', updatedCategories);
          setCategories(updatedCategories);
          
        });
        
  };

  const handleCategoryDelete = (event) => {
    event.preventDefault();
    axiosInstance.delete(`api/categories/${selectedCategory}`
      ).then((res)=>{console.log(res.data);
        }).catch((e)=>{
          console.log(e);
        });
        axiosInstance.get("api/categories").then((res) => {
            const updatedCategories = res.data.categories.map(category => ({
              id: category.id,
              name: category.name,
              slug: category.slug
            }));
    
          console.log('Updated Categories:', updatedCategories);
          setCategories(updatedCategories);
          
        });
  };


  useEffect(() => {
    if(categories == undefined){
        axiosInstance.get("api/categories").then((res) => {
          const updatedCategories = res.data.categories.map(category => ({
            id: category.id,
            name: category.name,
            slug: category.slug
          }));
  
        console.log('Updated Categories:', updatedCategories);
        setCategories(updatedCategories);
        })
      }

      if(roles == undefined){
        axiosInstance.get("api/roles").then((res) => {
          const updatedRoles = res.data.roles.map(role => ({
            id: role.id,
            name: role.name
          }));
  
        console.log('Updated Roles:', updatedRoles);
        setRoles(updatedRoles);
        })
      }

      if(users == undefined){
        axiosInstance.get("api/users").then((res) => {
          const updatedUsers = res.data.users.map(user => ({
            id: user.id,
            username: user.username,
            email: user.email,
          }));
  
        console.log('Updated Users:', updatedUsers);
        setUsers(updatedUsers);
        })
      }
  }, [])

  const handleUserDelete = () => {
    if (selectedUser) {
      axiosInstance.delete(`api/users/${selectedUser}`).then((res) => {console.log(res.data)});
      axiosInstance.get("api/users").then((res) => {
        const updatedUsers = res.data.users.map(user => ({
          id: user.id,
          username: user.username,
          email: user.email,
        }));

      console.log('Updated Users:', updatedUsers);
      setUsers(updatedUsers);
      })
    }
  }

  return (
    <div className='control-panel'>
      <h2>Control Panel</h2>
      <div>
        <label htmlFor="userSelect">Select User:</label>
        <select id="userSelect" value={selectedUser} onChange={handleUserChange}>
          <option value="">Select User</option>
          {users && (users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            )))}
        </select>
            {selectedUserRole && <p>is {selectedUserRole}</p>}
            {!selectedUserRole && <p>has no role</p>}
        {selectedUser && (
          <form onSubmit={handleSubmit}>
            <button type="button" onClick={handleUserDelete}>Delete user</button>
          </form>
        )}
      </div>
      <div>
        <label htmlFor="roleSelect">Select Role:</label>
        <select id="roleSelect" value={selectedRole} onChange={handleRoleChange}>
          <option value="">Select Role</option>
          {roles && (roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            )))}
        </select>
        
          <form onSubmit={handleSubmitRole}>
            <input type="text" onChange={(e) => setRoleName(e.target.value)} placeholder="New Role name" />
            <button type="submit">Add</button>
            {selectedRole && (
            <div>
            {selectedUser && !selectedUserRole && (
            <button type="button" onClick={handleRoleAssign}>Assign Role</button>
                )}
                {selectedUser && selectedUserRole && (
            <button type="button" onClick={handleRoleReplace}>Replace Role</button>
                )}
            <button type="button" onClick={handleRoleUpdate}>Update</button>
            <button type="button" onClick={handleRoleDelete}>Delete</button>
            </div>
        )}
          </form>
      </div>
      <div>
        <label htmlFor="PermissionSelect">Select Permission:</label>
        <select id="permissionSelect" value={selectedPermission} onChange={handlePermissionChange}>
          <option value="">Select Permission</option>
              <option>
                {'role-list'}
              </option>
              <option>
                {'role-create'}
              </option>
              <option>
                {'role-edit'}
              </option>
              <option>
                {'role-delete'}
              </option>
              <option>
                {'category-list'}
              </option>
              <option>
                {'category-create'}
              </option>
              <option>
                {'category-edit'}
              </option>
              <option>
                {'category-delete'}
              </option>
              <option>
                {'user-delete'}
              </option>
        </select>
      </div>
            {selectedPermission && selectedRole && (<div>
            <button type="button" onClick={handleRoleAddPermission}>Add permission</button>
            <button type="button" onClick={handleRoleRemovePermission}>Remove permission</button>
            </div>)}
      <div>
        <label htmlFor="categorySelect">Select Category:</label>
        <select id="categorySelect" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Select Category</option>
          {categories && (categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            )))}
        </select>
        
          <form onSubmit={handleSubmitCategory}>
            <input type="text" onChange={(e) => setCategoryName(e.target.value)} placeholder="Category name" />
            <input type="text" onChange={(e) => setCategorySlug(e.target.value)} placeholder="Category slug" />
            <button type="submit">Add</button>
            {selectedCategory && (
            <div>
            <button type="button" onClick={handleCategoryUpdate}>Update</button>
            <button type="button" onClick={handleCategoryDelete}>Delete</button>
            </div>
        )}
          </form>
      </div>
    </div>
  );
};

export default ControlPanel;