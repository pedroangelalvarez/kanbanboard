<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //Get parameters from the request
        $params = $request->input();
        //Verify params is null
        if(isset($params['solicitante']) && isset($params['transDate']) && isset($params['transTime'])  ){
            $ticket = Ticket::where('solicitante', $params['solicitante'])
                            ->where('transDate', $params['transDate'])
                            ->where('transTime', $params['transTime'])
                            ->get();
            return response()->json($ticket);
        } else if (isset($params['incidenteId'])){
            $ticket = Ticket::where('incidenteId', $params['incidenteId'])
                            ->get();
            return response()->json($ticket);
        } else {
            return Ticket::select('id','transDate','transTime','closeDate','closeTime','status','priority','complexity','description','tipo','solicitante','asignado','responsable','incidenteId')->get();
        }
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
            'incidenteId'=>'nullable'
        ]);

        Ticket::create($request->post());

        return response()->json([
            'message'=>'Ticket Created Successfully!!'
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
            'closeTime'=>'nullable',
            'status'=>'required',
            'priority'=>'required',
            'complexity'=>'required',
            'description'=>'required',
            'tipo'=>'required',
            'solicitante'=>'required',
            'asignado'=>'nullable',
            'responsable'=>'required',
            'incidenteId'=>'nullable'
        ]);

        /*
        Ticket::create($request->post());

        return response()->json([
            'message'=>'Ticket Created Successfully!!'
        ]);
        */
        $identificador = Ticket::create($request->post())-> id;

        return response()->json([
            $identificador
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Ticket  $ticket
     * @return \Illuminate\Http\Response
     */
    public function show(Ticket $ticket)
    {
        return response()->json([
            'ticket'=>$ticket
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Ticket  $ticket
     * @return \Illuminate\Http\Response
     */
    public function edit(Ticket $ticket)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Ticket  $ticket
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
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
            'asignado'=>'nullable',
            'responsable'=>'required',
            'incidenteId'=>'nullable'
        ]);
        */

        try{
            if (count($request->all()) == 1){
                $keys = array_keys($request->all());
                $values = array_values($request->all());
                $ticket = Ticket::where('id',$id);
                $ticket->update([$keys[0]=>$values[0]]);
            }
            else{
                
                for ($i=0; $i < count($request->all()); $i++) {
                    $keys = array_keys($request->all());
                    $values = array_values($request->all());
                    $ticket = Ticket::where('id',$id);
                    $ticket->update([$keys[$i]=>$values[$i]]);
                }
            }
            

            //return $ticket;
            return response()->json([
                'message'=>$ticket
            ]);

        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>$request
            ],500);
        }
    }

    /**
     * Modify the specified resource in storage.
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Ticket  $ticket
     * @return \Illuminate\Http\Response
     */
    public function modify(Request $request, Ticket $ticket)
    {
        $request->validate([
            'transDate'=>'required',
            'transTime'=>'required',
            'status'=>'required',
            'priority'=>'required',
            'complexity'=>'required',
            'description'=>'required',
            'tipo'=>'required',
            'solicitante'=>'required'
        ]);
        try{
            $ticket->fill($request->post())->update();
            return response()->json([
                'message'=>'Ticket Updated Successfully!!'
            ]);
        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while updating a ticket!!'
            ],500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Ticket  $ticket
     * @return \Illuminate\Http\Response
     */
    public function destroy(Ticket $ticket)
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
            $ticket->delete();

            return response()->json([
                'message'=>'Ticket Deleted Successfully!!'
            ]);
            
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while deleting a ticket!!'
            ]);
        }
    }
}
