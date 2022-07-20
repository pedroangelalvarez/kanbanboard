<?php

namespace App\Http\Controllers;

use App\Models\Incidente;
use Illuminate\Http\Request;

class IncidenteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Incidente::select('id','transDate','transTime','status','priority','complexity','description','tipo','solicitante','asignado','responsable','causa','solucion')->get();
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
            'transDate'=>'required',
            'transTime'=>'required',
            'status'=>'required',
            'priority'=>'required',
            'complexity'=>'required',
            'description'=>'required',
            'tipo'=>'required',
            'solicitante'=>'required',
            //'asignado'=>'required',
            'responsable'=>'required'

        ]);
        /*
        try{
            $imageName = Str::random().'.'.$request->image->getClientOriginalExtension();
            Storage::disk('public')->putFileAs('product/image', $request->image,$imageName);
            Product::create($request->post()+['image'=>$imageName]);

            return response()->json([
                'message'=>'Product Created Successfully!!'
            ]);
        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while creating a product!!'
            ],500);
        }
        */
        Incidente::create($request->post());

        return response()->json([
            'message'=>'Incidente Created Successfully!!'
        ]);
        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Incidente  $incidente
     * @return \Illuminate\Http\Response
     */
    public function show(Incidente $incidente)
    {
        return response()->json([
            'incidente'=>$incidente
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Incidente  $incidente
     * @return \Illuminate\Http\Response
     */
    public function edit(Incidente $incidente)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Incidente  $incidente
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Incidente $incidente)
    {
        $request->validate([
            'id'=>'required',
            'transDate'=>'required',
            'transTime'=>'required',
            'status'=>'required',
            'priority'=>'required',
            'complexity'=>'required',
            'description'=>'required',
            'tipo'=>'required',
            'solicitante'=>'required',
            //'asignado'=>'required',
            'responsable'=>'required'
            //'incidenteId'=>'required'
        ]);

        try{

            $incidente->fill($request->post())->update();

            return response()->json([
                'message'=>'Incidente Updated Successfully!!'
            ]);

        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while updating a incidente!!'
            ],500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Incidente  $incidente
     * @return \Illuminate\Http\Response
     */
    public function destroy(Incidente $incidente)
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
            $incidente->delete();

            return response()->json([
                'message'=>'Incidente Deleted Successfully!!'
            ]);
            
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while deleting a incidente!!'
            ]);
        }
    }
}
