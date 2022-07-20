<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;

class UsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Usuario::select('id','nombre','apellido','email','password','area','rol','estado')->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'id'=>'required',
            'nombre'=>'required',
            'apellido'=>'required',
            'email'=>'required',
            'password'=>'required',
            'area'=>'required',
            'rol'=>'required',
            'estado'=>'required'
        ]);
        Usuario::create($request->post());
        return response()->json([
            'message'=>'Usuario Created Successfully!!'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Usuario  $usuario
     * @return \Illuminate\Http\Response
     */
    public function show(Usuario $usuario)
    {
        return response()->json([
            'usuario'=>$usuario
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Usuario  $usuario
     * @return \Illuminate\Http\Response
     */
    public function edit(Usuario $usuario)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Usuario  $usuario
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Usuario $usuario)
    {
        $request->validate([
            'id'=>'required',
            'nombre'=>'required',
            'apellido'=>'required',
            'email'=>'required',
            'password'=>'required',
            'area'=>'required',
            'rol'=>'required',
            'estado'=>'required'
        ]);
        try{

            $usuario->fill($request->post())->update();

            return response()->json([
                'message'=>'Usuario Updated Successfully!!'
            ]);

        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while updating a usuario!!'
            ],500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Usuario  $usuario
     * @return \Illuminate\Http\Response
     */
    public function destroy(Usuario $usuario)
    {
        try {
            /*
            if($product->image){
                $exists = Storage::disk('public')->exists("product/image/{$product->image}");
                if($exists){
                    Storage::disk('public')->delete("product/image/{$product->image}");
                }
            }
            */
            $usuario->delete();

            return response()->json([
                'message'=>'Usuario Deleted Successfully!!'
            ]);
            
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while deleting a Usuario!!'
            ]);
        }
    }
}
