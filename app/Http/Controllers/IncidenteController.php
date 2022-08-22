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
        $request->validate([
            'transDate'=>'required',
            'transTime'=>'required',
            'closeDate'=>'nullable',
            'closeTime'=>'nullable',
            'status'=>'required',
            'priority'=>'required',
            'complexity'=>'required',
            'description'=>'required',
            'tipo'=>'required',
            'solicitante'=>'required',
            'asignado'=>'nullable',
            'responsable'=>'required',
            'causa'=>'nullable',
            'solucion'=>'nullable'

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
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'transDate'=>'required',
            'transTime'=>'required',
            'closeDate'=>'nullable',
            'status'=>'required',
            'priority'=>'required',
            'complexity'=>'required',
            'description'=>'required',
            'tipo'=>'required',
            'solicitante'=>'required',
            'asignado'=>'nullable',
            'responsable'=>'required',
            'causa'=>'nullable',
            'solucion'=>'nullable'

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
        $identificador = Incidente::create($request->post())-> id;

        return response()->json([
            $identificador
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
        /*
        $request->validate([
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
        */

        try{
                if (count($request->all()) == 1){
                    $keys = array_keys($request->all());
                    $values = array_values($request->all());
                    $ticket = Incidencia::where('id',$id);
                    $ticket->update([$keys[0]=>$values[0]]);
                }
                else{
                    $ticket = Incidencia::where("id", $id)->update([
                        'transDate'=>$request->transDate,
                        'transTime'=>$request->transTime,
                        'status'=>$request->status,
                        'priority'=>$request->priority,
                        'complexity'=>$request->complexity,
                        'description'=>$request->description,
                        'tipo'=>$request->tipo,
                        'solicitante'=>$request->solicitante,
                        'asignado'=>$request->asignado,
                        'responsable'=>$request->responsable,
                        'causa'=>$request->causa,
                        'solucion'=>$request->incidenteId
                    ]);
                }
                
    
                //return $ticket;
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
     * Modify the specified resource in storage.
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Incidente  $incidente
     * @return \Illuminate\Http\Response
     */ 
    public function modify(Request $request, Incidente $incidente)
    {
        $request->validate([
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
